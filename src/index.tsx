import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth } from './store/thunks/auth';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuth());

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ToastContainer />
			<App />
		</Provider>
	</React.StrictMode>
);
