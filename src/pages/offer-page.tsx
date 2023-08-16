import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames';
import Header from '../components/header/header';
import Review from '../components/review/review';
import ReviewForm from '../components/review-form/review-form';
import LeafletMap from '../components/leaflet-map/leaflet-map';
import NearbyOffersList from '../components/nearby-offers-list/nearby-offers-list';
import Error404Page from './error-404-page';
import Spinner from '../components/spinner/spinner';
import { capitalizeFirstLetter, getMultipleRandomArrayElements } from '../utils';
import { offerActions } from '../store/slices/offer';
import { reviewsActions } from '../store/slices/reviews';
import { useAppSelector, useActionCreators } from '../hooks';
import { MAX_OFFER_IMAGES, MAX_REVIEW_COUNT, MAX_NEARBY_OFFERS, AUTH_STATUS, RequestStatus } from '../const';

function OfferPage(): React.JSX.Element {
	const { offerId } = useParams();
	const actions = useActionCreators(offerActions);
	const reviewActions = useActionCreators(reviewsActions);
	const fullOffer = useAppSelector((state) => state.OFFER.offer);
	const nearbyOffers = useAppSelector((state) => state.OFFER.nearByOffers);
	const offerFetchingStatus = useAppSelector((state) => state.OFFER.offerStatus);
	const reviews = useAppSelector((state) => state.REVIEWS.reviews);
	const isLoading = offerFetchingStatus === RequestStatus.Pending;
	const isSuccess = offerFetchingStatus === RequestStatus.Success;

	useEffect(() => {
		if (offerId) {
			actions.fetchOffer(offerId);
			actions.fetchNearByOffers(offerId);
			reviewActions.fetchReviews(offerId);
		}

		return () => {
			actions.clear();
		};

	}, [offerId, actions]);

	//Если убрать это условие, всё ломается.
	if (fullOffer === null) {
		return <Error404Page />;
	}

	const { goods, rating, host, description, price, images, title, isFavorite, isPremium, type, bedrooms, maxAdults } = fullOffer;

	//Надо наверное как-то дженерик для функции использовать, но я так и не научился как.
	const randomNearByOffers = getMultipleRandomArrayElements(nearbyOffers, MAX_NEARBY_OFFERS);

	let detailedImages: string[] = images;
	if (images.length > 6) {
		detailedImages = images.slice(0, MAX_OFFER_IMAGES);
	}

	return (
		<div className="page">
			<Helmet>
				<title>6 Cities — Offer</title>
			</Helmet>
			<Header authStatus={AUTH_STATUS} />
			{isLoading && <Spinner />}
			{isSuccess && fullOffer && (
				<main className="page__main page__main--offer">
					<Helmet>
						<title>{`6 Cities — ${title}`}</title>
					</Helmet>
					<section className="offer">
						<div className="offer__gallery-container container">
							<div className="offer__gallery">
								{detailedImages.map((item) => (
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
								{isPremium && <div className="offer__mark"><span>Premium</span></div>}
								<div className="offer__name-wrapper">
									<h1 className="offer__name">
										{capitalizeFirstLetter(title)}
									</h1>
									<button
										className={classNames(
											'offer__bookmark-button', { 'offer__bookmark-button--active': isFavorite }, 'button')}
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
										<span style={{ width: `${Math.round(rating) * 20}%` }} />
										<span className="visually-hidden">Rating</span>
									</div>
									<span className="offer__rating-value rating__value">{rating}</span>
								</div>
								<ul className="offer__features">
									<li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
									<li className="offer__feature offer__feature--bedrooms">
										{bedrooms} Bedrooms
									</li>
									<li className="offer__feature offer__feature--adults">
										Max {maxAdults} adults
									</li>
								</ul>
								<div className="offer__price">
									<b className="offer__price-value">€{price}</b>
									<span className="offer__price-text">&nbsp;night</span>
								</div>
								<div className="offer__inside">
									<h2 className="offer__inside-title">What&apos;s inside</h2>
									<ul className="offer__inside-list">
										{goods.map((good) => (
											<li className="offer__inside-item" key={good}>{good}</li>
										))}
									</ul>
								</div>
								<div className="offer__host">
									<h2 className="offer__host-title">Meet the host</h2>
									<div className="offer__host-user user">
										<div className={classNames(
											'offer__avatar-wrapper', { 'offer__avatar-wrapper--pro': host.isPro }, 'user__avatar-wrapper'
										)}
										>
											<img
												className="offer__avatar user__avatar"
												src={host.avatarUrl}
												alt="Host avatar"
												width={74}
												height={74}
											/>
										</div>
										<span className="offer__user-name">{host.name}</span>
										{host.isPro && <span className="offer__user-status">Pro</span>}
									</div>
									<div className="offer__description">
										<p className="offer__text">
											{description}.
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
						<LeafletMap city={fullOffer} offers={randomNearByOffers} className={'offer__map map'} />
					</section>
					<NearbyOffersList nearbyOffers={randomNearByOffers} parentCSSClass='near-places' />
				</main>
			)}

		</div>

	);
}

export default OfferPage;
