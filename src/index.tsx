import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { fullOffers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOfferAction } from './store/api-actions';

store.dispatch(fetchOfferAction());

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App fullOffers={fullOffers} reviews={reviews} />
		</Provider>
	</React.StrictMode>
);
