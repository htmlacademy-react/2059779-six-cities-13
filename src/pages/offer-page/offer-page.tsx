import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames';
import Header from '../../components/header/header';
import Review from '../../components/review/review';
import ReviewForm from '../../components/review-form/review-form';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import Error404Page from '../error-404-page';
import Spinner from '../../components/spinner/spinner';
import Gallery from '../../components/gallery/gallery';
import FeaturesList from '../../components/features-list/features-list';
import Host from '../../components/host/host';
import { capitalizeFirstLetter, getMultipleRandomArrayElements } from '../../utils';
import { offerActions } from '../../store/slices/offer';
import { reviewsActions } from '../../store/slices/reviews';
import { useAppSelector, useActionCreators } from '../../hooks';
import { MAX_OFFER_IMAGES, MAX_REVIEW_COUNT, MAX_NEARBY_OFFERS, RequestStatus, AuthorizationStatus } from '../../const';

function OfferPage(): React.JSX.Element {
	const { offerId } = useParams();
	const actions = useActionCreators(offerActions);
	const reviewActions = useActionCreators(reviewsActions);
	const fullOffer = useAppSelector((state) => state.OFFER.offer);
	const nearbyOffers = useAppSelector((state) => state.OFFER.nearByOffers);
	const offerFetchingStatus = useAppSelector((state) => state.OFFER.offerStatus);
	const reviews = useAppSelector((state) => state.REVIEWS.reviews);
	const isFailed = offerFetchingStatus === RequestStatus.Failed;
	const isSuccess = offerFetchingStatus === RequestStatus.Success;

	const authStatus = useAppSelector((state) => state.USER.authorizationStatus);
	const isAuthorized = Boolean(authStatus === AuthorizationStatus.Auth);

	const sortedReviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	useEffect(() => {
		if (offerId) {
			actions.fetchOffer(offerId);
			actions.fetchNearByOffers(offerId);
			reviewActions.fetchReviews(offerId);
		}

		return () => {
			actions.clear();
			reviewActions.clear();
		};

	}, [offerId, actions, reviewActions]);

	if (fullOffer === null) {
		return <Spinner />;
	}

	if (isFailed) {
		return <Error404Page />;
	}

	const { goods, rating, host, description, price, images, title, isFavorite, isPremium, type, bedrooms, maxAdults } = fullOffer;

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
			<Header />
			{isSuccess && fullOffer && (
				<main className="page__main page__main--offer">
					<Helmet>
						<title>{`6 Cities — ${title}`}</title>
					</Helmet>
					<section className="offer">
						<Gallery images={detailedImages} />
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
								<FeaturesList features={goods} />
								<Host host={host} description={description} />
								<section className="offer__reviews reviews">
									<h2 className="reviews__title">
										Reviews · <span className="reviews__amount">{reviews.length}</span>
									</h2>
									<ul className="reviews__list">
										{sortedReviews.slice(0, MAX_REVIEW_COUNT).map((item) => <Review review={item} key={item.id} />)}
									</ul>
									{isAuthorized && <ReviewForm />}
								</section>
							</div>
						</div>
						<LeafletMap city={fullOffer.city} offers={randomNearByOffers} className={'offer__map map'} />
					</section>
					<NearbyOffersList nearbyOffers={randomNearByOffers} parentCSSClass='near-places' />
				</main>
			)}

		</div>

	);
}

export default OfferPage;
