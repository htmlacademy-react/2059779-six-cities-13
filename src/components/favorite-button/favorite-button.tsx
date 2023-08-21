import classNames from 'classnames';

type TFavoriteButtonProps = {
	parentCSSClass: string;
	isFavorite: boolean | undefined;
	iconWidth: number;
	iconHeight: number;
}

function FavoriteButton({ parentCSSClass, isFavorite, iconWidth, iconHeight }: TFavoriteButtonProps): React.JSX.Element {

	const buttonClass = classNames(isFavorite && `${parentCSSClass}__bookmark-button--active`, `${parentCSSClass}__bookmark-button button`);
	const svgClass = `${parentCSSClass}__bookmark-icon`;

	return (
		<button
			className={buttonClass}
			type="button"
		>
			<svg
				className={svgClass}
				width={iconWidth}
				height={iconHeight}
			>
				<use xlinkHref="#icon-bookmark" />
			</svg>
			<span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
		</button>
	);
}

export default FavoriteButton;
