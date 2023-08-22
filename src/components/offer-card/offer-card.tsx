import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TOffer } from '../../types/offer';
import { capitalizeFirstLetter } from '../../utils';
import { MouseEventHandler } from 'react';
import Price from '../price/price';
import FavoriteButton from '../favorite-button/favorite-button';

type OfferCardPropType = {
	item: TOffer;
	parentCSSClass?: string;
	onMouseEnter?: MouseEventHandler<HTMLElement>;
	onMouseLeave?: MouseEventHandler<HTMLElement>;
}

function OfferCard({ item, parentCSSClass, onMouseEnter, onMouseLeave }: OfferCardPropType): React.JSX.Element {

	const favoriteButtonClass = 'place-card';

	const articleClass = classNames(parentCSSClass && `${parentCSSClass}__card`,
		'place-card'
	);

	const wrapperClass = classNames(parentCSSClass && `${parentCSSClass}__image-wrapper`,
		'place-card__image-wrapper'
	);

	const priceParentClass = 'place-card';

	const { price, isPremium, isFavorite, title, rating, id, type, previewImage } = item;

	return (
		<article className={articleClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className={wrapperClass}>
				<Link to={`offers/${id}`}>
					<img
						className="place-card__image"
						src={previewImage}
						alt="Place image"
						width={260}
						height={200}
					/>
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<Price
						price={price}
						parentCSSClass={priceParentClass}
						divider=' /'
					/>
					<FavoriteButton
						parentCSSClass={favoriteButtonClass}
						isFavorite={isFavorite}
						offerId={id}
						iconHeight={19}
						iconWidth={18}
					/>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${Math.round(rating) * 20}%`}} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`offers/${id}`}>
						{capitalizeFirstLetter(title)}
					</Link>
				</h2>
				<p className="place-card__type">{capitalizeFirstLetter(type)}</p>
			</div>
		</article>
	);
}

export default OfferCard;
