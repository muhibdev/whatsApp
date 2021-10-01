/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Peer from 'simple-peer';
import { MEDIA_HONST } from '../../Configration/defaults';
import Paths from '../../Configration/Paths';

import './index.scss';

const Index = ({
	user,
	conversation,
	raciver,
	type,
	history,
	calls: { current },
	endCall,
	stream,
	ourVideoRef,
	otherVideoRef,
	currentCall,
}) => {
	const signalRef = useRef(null);

	useEffect(() => {
		if (raciver && current && window.socket) {
			const peer = new Peer({
				initiator: false,
				trickle: false,
				stream,
			});
			peer.on('signal', (signal) => {
				window.socket && window.socket.emit('Call Ringing', { call: current._id });
				signalRef.current = signal;
			});
			peer.on('stream', (stream) => {
				otherVideoRef.current.srcObject = stream;
			});

			peer.signal(current.signal);
			currentCall.current = peer;
		}
		if (!current.user && raciver) history.push(Paths.ChatsList);
	}, [current]);

	if (!raciver || !current.user) return null;
	return (
		<>
			<div className='call-info'>
				<img src={MEDIA_HONST + current.user.avatar} alt={current.user.name} className='user_profile' />
				<h2 className='user-name'>{current.user.name}</h2>
				<p className='call-status'>WhatsApp {current.type} call</p>
			</div>
			<div className='cantrolls-raciver'>
				<div onClick={() => endCall(current._id)} className='call-end'>
					<svg width='24' height='24' fill='currentColor' viewBox='0 0 405.333 405.333'>
						<path d='M373.333 266.88c-25.003 0-49.493-3.904-72.704-11.563-11.328-3.904-24.192-.896-31.637 6.699l-46.016 34.752c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512 11.563-20.971 7.915-32.64-7.723-23.36-11.648-47.872-11.648-72.832 0-17.643-14.357-32-32-32H32C14.357 0 0 14.357 0 32c0 205.845 167.488 373.333 373.333 373.333 17.643 0 32-14.357 32-32V298.88c0-17.643-14.357-32-32-32z'></path>
					</svg>
				</div>
				<div
					onClick={() => {
						window.socket &&
							window.socket.emit('Call Request Accepted', {
								call: current,
								signal: signalRef.current,
							});
					}}
					className='call-racive'>
					<svg width='24' height='24' fill='currentColor' viewBox='0 0 405.333 405.333'>
						<path d='M373.333 266.88c-25.003 0-49.493-3.904-72.704-11.563-11.328-3.904-24.192-.896-31.637 6.699l-46.016 34.752c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512 11.563-20.971 7.915-32.64-7.723-23.36-11.648-47.872-11.648-72.832 0-17.643-14.357-32-32-32H32C14.357 0 0 14.357 0 32c0 205.845 167.488 373.333 373.333 373.333 17.643 0 32-14.357 32-32V298.88c0-17.643-14.357-32-32-32z'></path>
					</svg>
				</div>
				<div className='message'>
					<svg width='24' height='24'>
						<path
							fill='currentColor'
							d='M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z'></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default withRouter(Index);
