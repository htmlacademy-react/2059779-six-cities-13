import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page';
import Favorites from '../../pages/favorites';
import Login from '../../pages/login';
import Offer from '../../pages/offer';
import Error404Screen from '../../pages/error-404-screen';

type AppProps = {
	placesCount: number;
}

function App({ placesCount }: AppProps): JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={AppRoute.Main}
						element={<MainPage placesCount={placesCount} />}
					/>
					<Route
						path={AppRoute.Favorites}
						element={<Favorites />}
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
