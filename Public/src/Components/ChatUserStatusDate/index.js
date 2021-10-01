/* eslint-disable react-hooks/exhaustive-deps */
import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import { GenralFormate } from '../../Configration/DataTimeFormates';

import useSWR from 'swr';
import { API_ROUTES } from '../../Configration/APIRoutes';

// import './index.scss';

const Index = ({ userID }) => {
	const { data } = useSWR(`${API_ROUTES.USER_STATUS}/${userID}`);
	const [status, setStatus] = useState(Date.now());
	useEffect(() => {
		if (data?.data?.data?.status?.status) setStatus(data?.data?.data?.status?.status);
	}, [JSON.stringify(data)]);
	return (
		<>
			Last seen <Moment format={GenralFormate}>{status}</Moment>
		</>
	);
};

export default Index;
