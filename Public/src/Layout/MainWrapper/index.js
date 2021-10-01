/* eslint-disable react-hooks/exhaustive-deps */
import { withRouter } from 'react-router-dom';
import './index.scss';

import Paths from '../../Configration/Paths';

import { useShallowEqualSelector } from '../../Hooks/Redux';
import { useEffect } from 'react';

const Index = ({ children, history }) => {
	const { calls, user } = useShallowEqualSelector(({ calls, user }) => ({ calls, user }));
	useEffect(() => {
		if (calls?.current?.conversation && user._id !== calls.current?.user?._id && !window.onCall) {
			const url = `${Paths.Chat}/${calls?.current?.conversation}${Paths.Call}?type=${calls.current.type}&receiver=true`;
			history.push(url);
			window.onCall = true;
		}
	}, [calls.current]);
	return children;
};

export default withRouter(Index);
