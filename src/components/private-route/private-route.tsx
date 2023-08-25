import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
	children: React.JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
	const { children } = props;
	const authStatus = useAppSelector((state) => state.USER.authorizationStatus);

	if (authStatus === AuthorizationStatus.Unknown) {
		return (<Spinner />);
	}

	if (authStatus === AuthorizationStatus.Auth) {
		return children;
	} else {
		return <Navigate to={AppRoute.Login} />;
	}
}

export default PrivateRoute;
