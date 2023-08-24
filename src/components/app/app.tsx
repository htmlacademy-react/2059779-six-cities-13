import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Error404Page from '../../pages/error-404-page';
import { loadMainPageData } from '../../pages/main-page/loader';
import { loadFavoritesPageData } from '../../pages/favorites-page/loader';

const router = createBrowserRouter([
	{
		path: AppRoute.Main,
		element: <MainPage />,
		errorElement: <Error404Page />,
		loader: loadMainPageData,
	},
	{
		path: AppRoute.Login,
		element: <LoginPage />
	},
	{
		path: `${AppRoute.Offer}/:offerId`,
		element: <OfferPage />,
		errorElement: <Error404Page />,
	},
	{
		path: AppRoute.Favorites,
		element: (
			<PrivateRoute>
				<FavoritesPage />
			</PrivateRoute>
		),
		loader: loadFavoritesPageData,
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
