import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TOffer } from '../../types/offer';
import { capitalizeFirstLetter } from '../../utils';
import { MouseEventHandler } from 'react';
import Price from '../price/price';
import FavoriteButton from '../favorite-button/favorite-button';
import Rating from '../rating/rating';

type OfferCardPropType = {
	item: TOffer;
	parentCSSClass?: string;
	imgHeight: number;
	imgWidth: number;
	onMouseEnter?: MouseEventHandler<HTMLElement>;
	onMouseLeave?: MouseEventHandler<HTMLElement>;
}

function OfferCard({ item, parentCSSClass, imgHeight, imgWidth, onMouseEnter, onMouseLeave }: OfferCardPropType): React.JSX.Element {

	const parentClass = 'place-card';

	const articleClass = classNames(parentCSSClass && `${parentCSSClass}__card`,
		'place-card'
	);

	const imageWrapperClass = classNames(parentCSSClass && `${parentCSSClass}__image-wrapper`,
		'place-card__image-wrapper'
	);

	const { price, isPremium, isFavorite, title, rating, id, type, previewImage } = item;

	return (
		<article className={articleClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className={imageWrapperClass}>
				<Link to={`/offer/${id}`}>
					<img
						className="place-card__image"
						src={previewImage}
						alt="Place image"
						width={imgWidth}
						height={imgHeight}
					/>
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<Price
						price={price}
						parentCSSClass={parentClass}
						divider=' /'
					/>
					<FavoriteButton
						parentCSSClass={parentClass}
						isFavorite={isFavorite}
						offerId={id}
						iconHeight={19}
						iconWidth={18}
					/>
				</div>
				<Rating
					parentCSSClass={parentClass}
					rating={rating}
				/>
				<h2 className="place-card__name">
					<Link to={`/offer/${id}`}>
						{capitalizeFirstLetter(title)}
					</Link>
				</h2>
				<p className="place-card__type">{capitalizeFirstLetter(type)}</p>
			</div>
		</article>
	);
}

export default OfferCard;
