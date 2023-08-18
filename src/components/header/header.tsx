import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useActionCreators } from '../../hooks';
import { AuthorizationStatus, AppRoute } from '../../const';
import { userActions } from '../../store/slices/user';

type HeaderProps = {
	authStatus: boolean;
}

function UserMenu({ authStatus }: HeaderProps): React.JSX.Element {
	const userEmail = useAppSelector((state) => state.USER.user?.email);
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
						<div className="header__avatar-wrapper user__avatar-wrapper" />
						<span className="header__user-name user__name">
							{userEmail}
						</span>
						<span className="header__favorite-count">3</span>
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

	const authStatus = useAppSelector((state) => state.USER.authorizationStatus);
	const isAuthorized = Boolean(authStatus === AuthorizationStatus.Auth);

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Link className="header__logo-link header__logo-link--active" to="/">
							<img
								className="header__logo"
								src="img/logo.svg"
								alt="6 cities logo"
								width="{81}"
								height="{41}"
							/>
						</Link>
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
