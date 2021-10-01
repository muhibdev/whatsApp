/* eslint-disable react-hooks/exhaustive-deps */
import { useActions } from './Redux';
import { useState, useEffect, useCallback } from 'react';

const useFatchAction = (action, { isLoading = false, arg = [] }) => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(!Boolean(isLoading));
	const Action = useActions(action);

	const getData = useCallback(async () => {
		try {
			await Action(...arg);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getData();
		window.addEventListener('focus', getData);

		return () => window.removeEventListener('focus', getData);
	}, []);
	return { error, loading };
};

export default useFatchAction;
