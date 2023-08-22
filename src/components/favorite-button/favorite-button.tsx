import classNames from 'classnames';
import { useState } from 'react';
import { useActionCreators } from '../../hooks';
import { favoritesActions } from '../../store/slices/favorites';
import { FavoriteChangeRequest } from '../../const';

type TFavoriteButtonProps = {
	parentCSSClass: string;
	isFavorite: boolean | undefined;
	offerId: string;
	iconWidth: number;
	iconHeight: number;
}

function FavoriteButton({ parentCSSClass, isFavorite, offerId, iconWidth, iconHeight }: TFavoriteButtonProps): React.JSX.Element {
	const [isBookmarked, setBookmark] = useState(isFavorite);
	const actions = useActionCreators(favoritesActions);
	const status = isBookmarked ? FavoriteChangeRequest.Remove : FavoriteChangeRequest.Add;

	const buttonClass = classNames(isBookmarked && `${parentCSSClass}__bookmark-button--active`, `${parentCSSClass}__bookmark-button button`);
	const svgClass = `${parentCSSClass}__bookmark-icon`;

	const handleButtonClick = () => {
		setBookmark((prevState) => !prevState);
		actions.changeFavorite({offerId, status});
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
