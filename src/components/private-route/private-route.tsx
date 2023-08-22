import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/use-authorize';

type PrivateRouteProps = {
	children: React.JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
	const { children } = props;

	const isAuthorized = useAuth();

	return (
		isAuthorized ? children	: <Navigate to={AppRoute.Login} />
	);
}

export default PrivateRoute;
