import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { Offer } from '../../mocks/offers';
import { capitalizeFirstLetter } from '../../utils';

type OfferCardPropType = {
	item: Offer;
}

function OfferCard({ item }: OfferCardPropType): React.JSX.Element {

	const favoriteButtonClass = classNames('place-card__bookmark-button', {
		'place-card__bookmark-button--active': item.isFavorite
	}, 'button');


	//Пункт пятый задания я или не понял, или делаю не так. Там предлагают сделать компонент для карточек, но это кажется избыточным. А вот свойство я получить не могу всё равно.
	const [id, setId] = useState();

	//Не уверен, что это верно.
	function handlePointerEnter(evt) {
		setId(item.id);
	}

	return (
		<article id={item.id} className="cities__card place-card" onPointerEnter={handlePointerEnter}>
			{item.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
			<div className="cities__image-wrapper place-card__image-wrapper">
				<Link to={`offer/${item.id}`}>
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
						<span style={{ width: `${item.rating * 20}%`}} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<Link to={`offer/${item.id}`}>
						{capitalizeFirstLetter(item.title)}
					</Link>
				</h2>
				<p className="place-card__type">{capitalizeFirstLetter(item.type)}</p>
			</div>
		</article>
	);
}

export default OfferCard;
