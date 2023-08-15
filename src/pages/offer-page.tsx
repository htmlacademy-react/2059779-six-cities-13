/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import classNames from 'classnames';
import Header from '../components/header/header';
import Review from '../components/review/review';
import ReviewForm from '../components/review-form/review-form';
import LeafletMap from '../components/leaflet-map/leaflet-map';
import NearbyOffersList from '../components/nearby-offers-list/nearby-offers-list';
import Error404Page from './error-404-page';
import type { TFullOffer } from '../mocks/offers';
import type { TReview } from '../mocks/reviews';
import { capitalizeFirstLetter } from '../utils';
import { MAX_OFFER_IMAGES, MAX_REVIEW_COUNT, AUTH_STATUS } from '../const';

type OfferPagePros = {
	fullOffers: TFullOffer[];
	reviews: TReview[];
}

function OfferPage({ fullOffers, reviews }: OfferPagePros): React.JSX.Element {
	const { id } = useParams();

	const fullOffer: TFullOffer | undefined = fullOffers.find((item) => item.id === id);
	if (fullOffer === undefined) {
		return <Error404Page />;
	}

	let detailedImages: string[] = fullOffer.images;
	if (fullOffer.images.length > 6) {
		detailedImages = fullOffer.images.slice(0, MAX_OFFER_IMAGES);
	}

	const nearbyOffers = faker.helpers.arrayElements(fullOffers, 3);

	return (
		<div className="page">
			<Helmet>
				<title>6 Cities — Offer</title>
			</Helmet>
			<Header authStatus={AUTH_STATUS} />
			<main className="page__main page__main--offer">
				<section className="offer">
					<div className="offer__gallery-container container">
						<div className="offer__gallery">
							{detailedImages.map((item) => (
								//Здесь в качестве ключа хотел использовать индекс массива. Хз, насколько это плохо в конкретном случае, но что тут ещё можно придумать не знаю. Поставил пока сам УРЛ, потому что бесит ошибками типа, которые я не знаю, как поправить.
								<div key={item} className="offer__image-wrapper">
									<img
										className="offer__image"
										src={item}
										alt="Photo studio"
									/>
								</div>
							))}
						</div>
					</div>
					<div className="offer__container container">
						<div className="offer__wrapper">
							{fullOffer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
							<div className="offer__name-wrapper">
								<h1 className="offer__name">
									{capitalizeFirstLetter(fullOffer.title)}
								</h1>
								<button
									className={classNames(
										'offer__bookmark-button', { 'offer__bookmark-button--active': fullOffer.isFavorite } , 'button')}
									type="button"
								>
									<svg className="offer__bookmark-icon" width={31} height={33}>
										<use xlinkHref="#icon-bookmark" />
									</svg>
									<span className="visually-hidden">To bookmarks</span>
								</button>
							</div>
							<div className="offer__rating rating">
								<div className="offer__stars rating__stars">
									<span style={{ width: `${fullOffer.rating * 20}%` }} />
									<span className="visually-hidden">Rating</span>
								</div>
								<span className="offer__rating-value rating__value">{fullOffer.rating}</span>
							</div>
							<ul className="offer__features">
								<li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(fullOffer.type)}</li>
								<li className="offer__feature offer__feature--bedrooms">
									{fullOffer.bedrooms} Bedrooms
								</li>
								<li className="offer__feature offer__feature--adults">
									Max {fullOffer.maxAdults} adults
								</li>
							</ul>
							<div className="offer__price">
								<b className="offer__price-value">€{fullOffer.price}</b>
								<span className="offer__price-text">&nbsp;night</span>
							</div>
							<div className="offer__inside">
								<h2 className="offer__inside-title">What&apos;s inside</h2>
								<ul className="offer__inside-list">
									{fullOffer.goods.map((good) => (
										<li className="offer__inside-item" key={good}>{good}</li>
									))}
								</ul>
							</div>
							<div className="offer__host">
								<h2 className="offer__host-title">Meet the host</h2>
								<div className="offer__host-user user">
									<div className={classNames(
										'offer__avatar-wrapper', { 'offer__avatar-wrapper--pro': fullOffer.host.isPro }, 'user__avatar-wrapper'
									)}
									>
										<img
											className="offer__avatar user__avatar"
											src={fullOffer.host.avatarUrl}
											alt="Host avatar"
											width={74}
											height={74}
										/>
									</div>
									<span className="offer__user-name">{fullOffer.host.name}</span>
									{fullOffer.host.isPro && <span className="offer__user-status">Pro</span>}
								</div>
								<div className="offer__description">
									<p className="offer__text">
										{fullOffer.description}.
										<br />
										А ниже не совсем понимаю, как быть со вторым параграфом. В примере на сервере вообще одно короткое предложение.
									</p>
									<p className="offer__text">
										An independent House, strategically located between Rembrand
										Square and National Opera, but where the bustle of the city
										comes to rest in this alley flowery and colorful.
									</p>
								</div>
							</div>
							<section className="offer__reviews reviews">
								<h2 className="reviews__title">
									Reviews · <span className="reviews__amount">{reviews.length}</span>
								</h2>
								<ul className="reviews__list">
									{reviews.slice(0, MAX_REVIEW_COUNT).map((item) => <Review review={item} key={item.id} />)}
								</ul>
								{AUTH_STATUS && <ReviewForm />}
							</section>
						</div>
					</div>
					<LeafletMap city={nearbyOffers[0]} offers={nearbyOffers} className={'offer__map map'} />
				</section>
				<NearbyOffersList nearbyOffers={nearbyOffers} parentCSSClass='near-places' />
			</main>
		</div>

	);
}

export default OfferPage;
