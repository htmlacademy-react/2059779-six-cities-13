import { useAppSelector } from '.';
import { AuthorizationStatus } from '../const';

export function useAuth() {
	const authStatus = useAppSelector((state) => state.USER.authorizationStatus);
	return authStatus === AuthorizationStatus.Auth;
}
