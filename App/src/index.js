import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './Redux/Store';
import Socket from './Components/Socket';

import { SWRConfig } from 'swr';
import API, { authHeader } from './Api';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store()}>
			<SWRConfig
				value={{
					fetcher: (...args) => API(...args, authHeader()),
				}}>
				<Socket>
					<App />
				</Socket>
			</SWRConfig>
		</Provider>
	</React.StrictMode>,
	document.getElementById('WhatsApp-Container')
);
