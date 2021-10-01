/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { MEDIA_HONST } from '../../Configration/defaults';
import Peer from 'simple-peer';

import { useShallowEqualSelector, useActions } from '../../Hooks/Redux';
import { CallsState } from '../../Configration/States';
import { updateCall } from '../../Redux/Calls/actions';

import './index.scss';

const Index = ({
	user,
	conversation,
	raciver,
	type,
	calls: { current },
	endCall,
	stream,
	ourVideoRef,
	otherVideoRef,
	currentCall,
}) => {
	const currUser = conversation.members.find((m) => m._id !== user._id);

	const UpdateCall = useActions(updateCall);

	useEffect(() => {
		if (raciver || !user._id || window.onCall || !window.socket) return;

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream,
		});

		peer.on('signal', (signal) => {
			window.socket.emit('Send Call Request', {
				conversation: conversation._id,
				user: user._id,
				members: conversation.members.filter((e) => e._id !== user._id).map((e) => e._id),
				type,
				signal,
			});
		});
		peer.on('stream', (stream) => {
			console.log('====================================');
			console.log(stream, 'stream');
			console.log('====================================');
			otherVideoRef.current.srcObject = stream;
		});
		peer.on('data', (data) => {
			console.log(data, 'Data');
		});
		window.socket.on('Call Request Accepted', ({ call, signal }) => {
			console.log(signal);
			peer.signal(signal);
		});

		window.onCall = true;
		currentCall.current = peer;

		/* listning For the user is Busy */
		window.socket.on('Bussey On Call', (call) => {
			UpdateCall({
				status: CallsState.Bussay,
			});
			setTimeout(() => endCall(call._id), 1000);
		});
	}, [user._id]);
	if (raciver) return null;
	return (
		<>
			<div className='call-info'>
				<img src={MEDIA_HONST + currUser.avatar} alt={currUser.name} className='user_profile' />
				<h2 className='user-name'>{currUser.name}</h2>
				<p className='call-status'>{current.status || CallsState.Connecting}</p>
			</div>
			<div className='cantrolls-sender'>
				<div className='speaker'>
					<svg version='1.0' width='24' height='24' viewBox='0 0 75 75'>
						<path
							d='M39.389 13.769L22.235 28.606H6v19.093h15.989l17.4 15.051V13.769z'
							stroke='currentColor'
							strokeWidth='5'
							strokeLinejoin='round'
							fill='currentColor'
						/>
						<path
							d='M48 27.6A19.5 19.5 0 0148 49m7.1-28.5a30 30 0 010 35.6M61.6 14a38.8 38.8 0 010 48.6'
							fill='none'
							stroke='currentColor'
							strokeWidth='5'
							strokeLinecap='round'
						/>
					</svg>
				</div>
				<div className='video-call disable'>
					<svg fill='currentColor' width='24' height='24' viewBox='0 0 30 30'>
						<path d='M19 24H2a2 2 0 01-2-2V8a2 2 0 012-2h17a2 2 0 012 2v14a2 2 0 01-2 2zM23 15h7V9l-1.661-.75L23 13z'></path>
						<circle cx='29' cy='9' r='1'></circle>
						<path d='M23 15h7v6l-1.661.75L23 17z'></path>
						<circle cx='29' cy='21' r='1'></circle>
					</svg>
				</div>
				<div className='mic'>
					<svg fill='currentColor' viewBox='0 0 100 100' width='24' height='24'>
						<path d='M65.595 56.035V43.349L38.639 70.307a17.16 17.16 0 009.695 2.989c9.518 0 17.261-7.743 17.261-17.261z' />
						<path d='M76.078 45.715H72.64a2 2 0 00-2 2v7.029c0 12.3-10.007 22.308-22.308 22.308a22.186 22.186 0 01-12.559-3.882l-5.245 5.245c4.037 3.084 8.856 5.177 14.086 5.835v4.98h-15.35a2 2 0 00-2 2v3.436a2 2 0 002 2h38.138a2 2 0 002-2V91.23a2 2 0 00-2-2H52.051v-4.98c14.594-1.838 26.026-14.799 26.026-29.506v-7.029c.001-1.105-.895-2-1.999-2zM85.972 7.694a5.5 5.5 0 00-7.777 0l-12.6 12.6v-3.032C65.595 7.743 57.852 0 48.333 0S31.071 7.743 31.071 17.262v37.554l-4.552 4.552a22.233 22.233 0 01-.494-4.624v-7.029a2 2 0 00-2-2h-3.437a2 2 0 00-2 2v7.029c0 3.67.726 7.227 2.022 10.533l-9.917 9.916a5.5 5.5 0 007.778 7.779l67.5-67.5a5.497 5.497 0 00.001-7.778z' />
					</svg>
				</div>
				<div onClick={() => endCall(current._id)} className='call-end'>
					<svg width='24' height='24' fill='currentColor' viewBox='0 0 405.333 405.333'>
						<path d='M373.333 266.88c-25.003 0-49.493-3.904-72.704-11.563-11.328-3.904-24.192-.896-31.637 6.699l-46.016 34.752c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512 11.563-20.971 7.915-32.64-7.723-23.36-11.648-47.872-11.648-72.832 0-17.643-14.357-32-32-32H32C14.357 0 0 14.357 0 32c0 205.845 167.488 373.333 373.333 373.333 17.643 0 32-14.357 32-32V298.88c0-17.643-14.357-32-32-32z'></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Index;
