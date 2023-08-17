import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page';
import FavoritesPage from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
import OfferPage from '../../pages/offer-page';
import Error404Page from '../../pages/error-404-page';

const router = createBrowserRouter([
	{
		path: AppRoute.Main,
		element: <MainPage />,
		errorElement: <Error404Page />
	},
	{
		path: AppRoute.Login,
		element: <LoginPage />
	},
	{
		path: `${AppRoute.Offers}/:offerId`,
		element: <OfferPage />,
		errorElement: <Error404Page />
	},
	{
		path: AppRoute.Favorites,
		element: <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><FavoritesPage /></PrivateRoute>
	}
]);

function App(): React.JSX.Element {
	return (
		<HelmetProvider>
			<RouterProvider router={router} />
		</HelmetProvider>
	);
}

export default App;
