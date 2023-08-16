import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TOffer } from '../../types/offer';
import { capitalizeFirstLetter } from '../../utils';
import { MouseEventHandler } from 'react';

type OfferCardPropType = {
	item: TOffer;
	parentCSSClass?: string;
	onMouseEnter?: MouseEventHandler<HTMLElement>;
	onMouseLeave?: MouseEventHandler<HTMLElement>;
}

function OfferCard({ item, parentCSSClass, onMouseEnter, onMouseLeave }: OfferCardPropType): React.JSX.Element {

	const favoriteButtonClass = classNames('place-card__bookmark-button', {
		'place-card__bookmark-button--active': item.isFavorite
	}, 'button');

	//Ругается на тип, не понимаю
	const articleClass = classNames(parentCSSClass && `${parentCSSClass}__card`,
		'place-card'
	);

	const wrapperClass = classNames(parentCSSClass && `${parentCSSClass}__image-wrapper`,
		'place-card__image-wrapper'
	);

	return (
		<article className={articleClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{item.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className={wrapperClass}>
				<Link to={`offers/${item.id}`}>
					<img
						className="place-card__image"
						src={item.previewImage}
						alt="Place image"
						width={260}
						height={200}
					/>
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{item.price}</b>
						<span className="place-card__price-text">/&nbsp;night</span>
					</div>
					<button
						className={favoriteButtonClass}
						type="button"
					>
						<svg
							className="place-card__bookmark-icon"
							width={18}
							height={19}
						>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">To bookmarks</span>
					</button>
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${Math.round(item.rating) * 20}%`}} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`offers/${item.id}`}>
						{capitalizeFirstLetter(item.title)}
					</Link>
				</h2>
				<p className="place-card__type">{capitalizeFirstLetter(item.type)}</p>
			</div>
		</article>
	);
}

export default OfferCard;
