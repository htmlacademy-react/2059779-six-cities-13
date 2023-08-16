import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, TAuthorizationStatusValue } from '../../const';

type PrivateRouteProps = {
	authorizationStatus: TAuthorizationStatusValue;
	children: React.JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
	const { authorizationStatus, children } = props;

	return (
		authorizationStatus === AuthorizationStatus.NoAuth
			? children
			: <Navigate to={AppRoute.Login} />
	);
}

export default PrivateRoute;
