/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Reducers from './Reducers';

export default () => {
	const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));
	if (module.hot) {
		module.hot.accept('./Reducers', () => {
			const nextRootReducer = require('./Reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
