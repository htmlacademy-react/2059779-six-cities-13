import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-authorize';
import LoginForm from '../components/login-form/login-form';
import RandomCity from '../components/random-city/random-city';
import Logo from '../components/logo/logo';
import { useAppSelector } from '../hooks';
import { AuthorizationStatus } from '../const';
import Spinner from '../components/spinner/spinner';

function LoginPage(): React.JSX.Element {
	const isAuthorized = useAuth();
	const authStatus = useAppSelector((state) => state.USER.authorizationStatus);

	// if (authStatus === AuthorizationStatus.Unknown) {
	// 	return <Spinner />;
	// }

	if (isAuthorized) {
		return <Navigate to='/' />;
	}

	return (
		<div className="page page--gray page--login">
			<Helmet>
				<title>6 Cities — Login</title>
			</Helmet>
			<header className="header">
				<div className="container">
					<div className="header__wrapper">
						<div className="header__left">
							<Logo />
						</div>
					</div>
				</div>
			</header>
			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<LoginForm />
					<RandomCity />
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
