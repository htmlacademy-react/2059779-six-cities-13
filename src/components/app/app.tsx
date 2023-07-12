import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import type { Offer } from '../../mocks/offers';
import type { Review } from '../../mocks/reviews';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page';
import Favorites from '../../pages/favorites';
import Login from '../../pages/login';
import OfferPage from '../../pages/offer-page';
import Error404Screen from '../../pages/error-404-screen';

type AppProps = {
	placesCount: number;
	offers: Offer[];
	reviews: Review[];
}

function App({ placesCount, offers, reviews }: AppProps): React.JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={AppRoute.Main}
						element={<MainPage placesCount={placesCount} offers={offers} />}
					/>
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute
								authorizationStatus={AuthorizationStatus.NoAuth}
							>
								<Favorites offers={offers} />
							</PrivateRoute>
						}
					/>
					<Route
						path={AppRoute.Login}
						element={<Login />}
					/>
					<Route
						path={AppRoute.Offer}
						element={<OfferPage />}
					/>
					<Route
						path='*'
						element={<Error404Screen />}
					/>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
