import { CSSProperties } from 'react';
import { offer } from '../../mocks/offers';
import { capitalizeFirstLetter } from '../../utils';

type FavoriteOfferCardPropType = {
	item: offer;
}

//Второй раз использую, может вынести в utils какой-нибудь?
const WidthByRating: Record<number, `${number}%` | `${number}`> = {
	0: '0',
	1: '20%',
	2: '40%',
	3: '60%',
	4: '80%',
	5: '100%'
} as const;

function FavoriteOfferCard({ item }: FavoriteOfferCardPropType): React.JSX.Element {
	const starsCount: CSSProperties = {
		width: WidthByRating[Math.round(item.rating)]
	};

	return (
		<article className="favorites__card place-card">
			{item.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className="favorites__image-wrapper place-card__image-wrapper">
				<a href="#">
					<img
						className="place-card__image"
						src={item.previewImage}
						alt="Place image"
						width={150}
						height={110}
					/>
				</a>
			</div>
			<div className="favorites__card-info place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{item.price}</b>
						<span className="place-card__price-text">
							/&nbsp;night
						</span>
					</div>
					<button
						className="place-card__bookmark-button place-card__bookmark-button--active button"
						type="button"
					>
						<svg
							className="place-card__bookmark-icon"
							width={18}
							height={19}
						>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">In bookmarks</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={starsCount} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<a href="#">{capitalizeFirstLetter(item.title)}</a>
				</h2>
				<p className="place-card__type">{capitalizeFirstLetter(item.type)}</p>
			</div>
		</article>
	);
}

export default FavoriteOfferCard;
