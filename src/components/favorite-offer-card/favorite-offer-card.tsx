import { Link } from 'react-router-dom';
import { TOffer } from '../../types/offer';
import { capitalizeFirstLetter } from '../../utils';
import FavoriteButton from '../favorite-button/favorite-button';

type FavoriteOfferCardPropType = {
	item: TOffer;
}

function FavoriteOfferCard({ item }: FavoriteOfferCardPropType): React.JSX.Element {

	return (
		<article className="favorites__card place-card">
			{item.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className="favorites__image-wrapper place-card__image-wrapper">
				<Link to={`../offers/${item.id}`}>
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
					<FavoriteButton
						parentCSSClass='place-card'
						isFavorite={item.isFavorite}
						offerId={item.id}
						iconHeight={18}
						iconWidth={19}
					/>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${item.rating * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`../offers/${item.id}`}>{capitalizeFirstLetter(item.title)}</Link>
				</h2>
				<p className="place-card__type">{capitalizeFirstLetter(item.type)}</p>
			</div>
		</article>
	);
}

export default FavoriteOfferCard;
