import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import type { TReview } from '../../mocks/reviews';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page';
import FavoritesPage from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
import OfferPage from '../../pages/offer-page';
import Error404Page from '../../pages/error-404-page';

type AppProps = {
	reviews: TReview[];
}

function App({ reviews }: AppProps): React.JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={AppRoute.Main}
						element={<MainPage />}
					/>
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute
								authorizationStatus={AuthorizationStatus.NoAuth}
							>
								<FavoritesPage />
							</PrivateRoute>
						}
					/>
					<Route
						path={AppRoute.Login}
						element={<LoginPage />}
					/>
					<Route
						path={`${AppRoute.Offer}/:id`}
						element={<OfferPage reviews={reviews} />}
					/>
					<Route
						path='*'
						element={<Error404Page />}
					/>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
