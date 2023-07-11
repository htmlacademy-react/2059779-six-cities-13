import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import { offer } from '../../mocks/offers';
import { review } from '../../mocks/reviews';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page';
import Favorites from '../../pages/favorites';
import Login from '../../pages/login';
import Offer from '../../pages/offer';
import Error404Screen from '../../pages/error-404-screen';

type AppProps = {
	placesCount: number;
	offers: offer[];
	reviews: review[];
}

function App({ placesCount, offers, reviews }: AppProps): JSX.Element {
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
								<Favorites />
							</PrivateRoute>
						}
					/>
					<Route
						path={AppRoute.Login}
						element={<Login />}
					/>
					<Route
						path={AppRoute.Offer}
						element={<Offer />}
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
