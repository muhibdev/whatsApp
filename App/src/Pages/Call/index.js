/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import useFatchAction from '../../Hooks/useFatchAction';
import { getAllChats, clearCurrentConversation } from '../../Redux/Chats/actions';
import { clearCurrent } from '../../Redux/Calls/actions';
import { useShallowEqualSelector, useActions } from '../../Hooks/Redux';

import CallSenderCantrolls from '../../Components/CallSenderCantrolls';
import CallRaciverCantrolls from '../../Components/CallRaciverCantrolls';
import Loading from '../../Components/Loading';

import { CallTypes } from '../../Configration/States';

import './index.scss';

const Index = ({ match, history }) => {
	const [ClearCurrentConversation, ClearCurrent] = useActions([clearCurrentConversation, clearCurrent]);
	const query = new URLSearchParams(window.location.search);
	const raciver = query.get('receiver') === 'true';
	const [type, setType] = useState(query.get('type') || CallTypes.Audio);

	/*  */
	const [stream, setStream] = useState();
	const ourVideoRef = useRef(null);
	const otherVideoRef = useRef(null);
	const currentCall = useRef(null);

	const { user, chats, calls } = useShallowEqualSelector(({ user, chats, calls }) => ({
		user,
		chats,
		calls,
	}));

	const { loading } = useFatchAction(getAllChats, {
		arg: [match?.params?.id],
		// isLoading: chats?.conversation?.members && match?.params?.id === chats?.conversation?._id,
	});

	const endCall = (calls) => {
		// ClearCurrent();
		window.onCall = false;
		history.goBack();
		window.socket && window.socket.emit('Call Ended', calls);
	};

	useEffect(() => {
		if (query.get('receiver') === null) history.push('/');
		return () => ClearCurrentConversation();
	}, []);
	useEffect(() => {
		(async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
				setStream(stream);
			} catch (error) {
				console.log('====================================');
				console.log('devices not found', error);
				console.log('====================================');
			}
		})();
	}, []);

	useEffect(() => {
		if (!stream || !ourVideoRef.current) return;
		ourVideoRef.current.srcObject = stream;
	}, [stream, ourVideoRef.current]);

	return (
		<>
			{loading ? <Loading>Loading Chats and User details...</Loading> : ''}
			<div id='call'>
				{chats?.conversation?.members && (
					<>
						<video ref={ourVideoRef} playsInline autoPlay style={{ width: '50px' }} />
						<video ref={otherVideoRef} playsInline autoPlay style={{ width: '300px' }} />
						<CallRaciverCantrolls
							calls={calls}
							type={type}
							raciver={raciver}
							user={user}
							conversation={chats.conversation}
							endCall={endCall}
							stream={stream}
							ourVideoRef={ourVideoRef}
							otherVideoRef={otherVideoRef}
							currentCall={currentCall}
						/>
						<CallSenderCantrolls
							calls={calls}
							type={type}
							raciver={raciver}
							user={user}
							conversation={chats.conversation}
							endCall={endCall}
							stream={stream}
							ourVideoRef={ourVideoRef}
							otherVideoRef={otherVideoRef}
							currentCall={currentCall}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default withRouter(Index);
