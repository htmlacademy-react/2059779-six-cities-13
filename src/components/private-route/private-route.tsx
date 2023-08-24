import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
	children: React.JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
	const { children } = props;
	const authStatus = useAppSelector((state) => state.USER.authorizationStatus);

	//const isAuthorized = useAuth();

	if (authStatus === AuthorizationStatus.Unknown) {
		return (<div>Loading...</div>);
	}

	if (authStatus === AuthorizationStatus.Auth) {
		return children;
	} else {
		return <Navigate to={AppRoute.Login} />;
	}
}

export default PrivateRoute;
