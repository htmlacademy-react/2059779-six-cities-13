import { Link } from 'react-router-dom';
import { TOffer } from '../../types/offer';
import { capitalizeFirstLetter } from '../../utils';

type FavoriteOfferCardPropType = {
	item: TOffer;
}

function FavoriteOfferCard({ item }: FavoriteOfferCardPropType): React.JSX.Element {

	return (
		<article className="favorites__card place-card">
			{item.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className="favorites__image-wrapper place-card__image-wrapper">
				<Link to={`../offer/${item.id}`}>
					<img
						className="place-card__image"
						src={item.previewImage}
						alt="Place image"
						width={150}
						height={110}
					/>
				</Link>
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
						<span style={{ width: `${item.rating * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`../offer/${item.id}`}>{capitalizeFirstLetter(item.title)}</Link>
				</h2>
				<p className="place-card__type">{capitalizeFirstLetter(item.type)}</p>
			</div>
		</article>
	);
}

export default FavoriteOfferCard;
