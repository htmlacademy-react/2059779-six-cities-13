import classNames from 'classnames';
import { useState } from 'react';
import { useActionCreators } from '../../hooks';
import { favoritesActions } from '../../store/slices/favorites';
import { AppRoute, FavoriteChangeRequest } from '../../const';
import { useAuth } from '../../hooks/use-authorize';
import { useNavigate } from 'react-router-dom';

type TFavoriteButtonProps = {
	parentCSSClass: string;
	isFavorite: boolean | undefined;
	offerId: string;
	iconWidth: number;
	iconHeight: number;
}

function FavoriteButton({ parentCSSClass, isFavorite, offerId, iconWidth, iconHeight }: TFavoriteButtonProps): React.JSX.Element {
	const [isBookmarked, setBookmark] = useState(isFavorite);
	const {changeFavorite} = useActionCreators(favoritesActions);
	const status = isBookmarked ? FavoriteChangeRequest.Remove : FavoriteChangeRequest.Add;
	const isAuthorized = useAuth();
	const navigate = useNavigate();

	const buttonClass = classNames(isBookmarked && `${parentCSSClass}__bookmark-button--active`, `${parentCSSClass}__bookmark-button button`);
	const svgClass = `${parentCSSClass}__bookmark-icon`;

	const handleButtonClick = () => {
		if (isAuthorized) {
			setBookmark((prevState) => !prevState);
			changeFavorite({ offerId, status });
		} else {
			navigate(AppRoute.Login);
		}
	};

	return (
		<button
			className={buttonClass}
			type="button"
			onClick={handleButtonClick}
		>
			<svg
				className={svgClass}
				width={iconWidth}
				height={iconHeight}
			>
				<use xlinkHref="#icon-bookmark" />
			</svg>
			<span className="visually-hidden">{isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
		</button>
	);
}

export default FavoriteButton;
