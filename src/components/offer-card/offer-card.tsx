import { CSSProperties } from 'react';
import { IOffer } from '../../mocks/offers';
//import { classNames } from 'classNames';

type offerCardPropType = {
	item: IOffer;
}

const WidthByRating: Record<number, `${number}%` | `${number}`> = {
	0: '0',
	1: '20%',
	2: '40%',
	3: '60%',
	4: '80%',
	5: '100%'
} as const;

//Здесь запутался с фигурными скобками. Почему их нужно ставить?
function OfferCard({ item }: offerCardPropType): JSX.Element {
	const favoriteButtonClass = item.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';

	//Не могу понять, как импортировать пакет. Но немного смущает на такие операции ставить пакеты.
	/* 	const favoriteButtonClass = classNames('place-card__bookmark-button', {
		'place-card__bookmark-button--active': item.isFavorite
	}, 'button'); */

	const starsCount: CSSProperties = {
		width: WidthByRating[item.rating]
	};

	return (
		<article className="cities__card place-card">
			{item.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className="cities__image-wrapper place-card__image-wrapper">
				<a href="#">
					<img
						className="place-card__image"
						src={item.previewImage}
						alt="Place image"
						width={260}
						height={200}
					/>
				</a>
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
						<span style={ starsCount } />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<a href="#">
						{item.title}
					</a>
				</h2>
				<p className="place-card__type">{item.type}</p>
			</div>
		</article>
	);
}

export default OfferCard;
