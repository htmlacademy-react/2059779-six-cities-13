import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { placesCount } from './mocks/main-page';
import { offers, fullOffers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App placesCount={placesCount} offers={offers} fullOffers={fullOffers} reviews={reviews} />
	</React.StrictMode>
);
