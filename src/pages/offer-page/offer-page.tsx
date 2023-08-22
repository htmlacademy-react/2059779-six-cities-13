import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import Error404Page from '../error-404-page';
import Spinner from '../../components/spinner/spinner';
import Gallery from '../../components/gallery/gallery';
import GoodsList from '../../components/goods-list/goods-list';
import Host from '../../components/host/host';
import FeaturesList from '../../components/features-list/features-list';
import { capitalizeFirstLetter, getMultipleRandomArrayElements } from '../../utils';
import { offerActions } from '../../store/slices/offer';
import { reviewsActions } from '../../store/slices/reviews';
import { useAppSelector, useActionCreators } from '../../hooks';
import { MAX_OFFER_IMAGES, MAX_NEARBY_OFFERS, RequestStatus } from '../../const';
import Price from '../../components/price/price';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import Rating from '../../components/rating/rating';

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
	const parentClass = 'offer';

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

	const { goods, rating, host, description, price, images, title, isFavorite, isPremium, type, bedrooms, maxAdults, id } = fullOffer;

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
									<FavoriteButton
										parentCSSClass={parentClass}
										isFavorite={isFavorite}
										offerId={id}
										iconHeight={31}
										iconWidth={33}
									/>
								</div>
								<Rating
									parentCSSClass={parentClass}
									rating={rating}
									isLabeled
								/>
								<FeaturesList
									bedrooms={bedrooms}
									maxAdults={maxAdults}
									type={type}
								/>
								<Price
									price={price}
									parentCSSClass={parentClass}
								/>
								<GoodsList features={goods} />
								<Host
									host={host}
									description={description}
								/>
								<ReviewsList reviews={sortedReviews} />
							</div>
						</div>
						<LeafletMap
							city={fullOffer.city}
							offers={randomNearByOffers}
							className={'offer__map map'}
							currentOffer={fullOffer}
						/>
					</section>
					<NearbyOffersList
						nearbyOffers={randomNearByOffers}
					/>
				</main>
			)}
		</div>
	);
}

export default OfferPage;
