import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useActionCreators } from '../../hooks';
import { AppRoute } from '../../const';
import { userActions } from '../../store/slices/user';
import { useAuth } from '../../hooks/use-authorize';
import { useEffect } from 'react';
import { favoritesActions } from '../../store/slices/favorites';
import Logo from '../logo/logo';

type TUserMenuProps = {
	authStatus: boolean;
}

function UserMenu({ authStatus }: TUserMenuProps): React.JSX.Element {
	const userEmail = useAppSelector((state) => state.USER.user?.email);
	const userAvatarURL = useAppSelector((state) => state.USER.user?.avatarUrl) as string;
	const favoritesCount = useAppSelector((state) => state.Favorites.favoritesCount);
	const actions = useActionCreators(userActions);
	const navigate = useNavigate();

	const handleLogoutClick = (evt: React.MouseEvent<HTMLElement>) => {
		evt.preventDefault();
		actions.logout();
		actions.clear();

		navigate(AppRoute.Main);
	};

	if (authStatus) {
		return (
			<>
				<li className="header__nav-item user">
					<Link className="header__nav-link header__nav-link--profile" to="/favorites">
						<div
							style={
								{
									backgroundImage: `url(${userAvatarURL})`,
									borderRadius: '50%',
								}
							}
							className="header__avatar-wrapper user__avatar-wrapper"
						/>
						<span className="header__user-name user__name">
							{userEmail}
						</span>
						<span className="header__favorite-count">{favoritesCount}</span>
					</Link>
				</li>
				<li className="header__nav-item">
					<Link onClick={handleLogoutClick} className="header__nav-link" to="/">
						<span className="header__signout">Sign out</span>
					</Link>
				</li>
			</>
		);
	}

	return (
		<li className="header__nav-item user">
			<Link className="header__nav-link header__nav-link--profile" to="/login">
				<div className="header__avatar-wrapper user__avatar-wrapper">
				</div>
				<span className="header__login">Sign in</span>
			</Link>
		</li>
	);
}

function Header(): React.JSX.Element {
	const isAuthorized = useAuth();
	const favoriteActions = useActionCreators(favoritesActions);

	useEffect(() => {
		if (isAuthorized) {
			favoriteActions.fetchFavorites();
		}
	}, [isAuthorized, favoriteActions]);

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Logo />
					</div>
					<nav className="header__nav">
						<ul className="header__nav-list">
							<UserMenu authStatus={isAuthorized} />
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
