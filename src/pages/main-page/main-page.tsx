import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useActionCreators, useAppSelector } from '../../hooks';
import classNames from 'classnames';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import EmptyOffers from '../../components/empty-offers/empty-offers';
import CityList from '../../components/city-list/city-list';
import Spinner from '../../components/spinner/spinner';
import { getOffersByCity } from '../../utils';
import { RequestStatus } from '../../const';
import { useAuth } from '../../hooks/use-authorize';
import { favoritesActions } from '../../store/slices/favorites';

function MainPage(): React.JSX.Element {
	const favoriteActions = useActionCreators(favoritesActions);
	const isAuthorized = useAuth();
	const offers = useAppSelector((state) => state.OFFERS.offers);
	const offersByCity = getOffersByCity(offers);
	const selectedCity = useAppSelector((state) => state.OFFERS.selectedCity);
	const offersFetchingStatus = useAppSelector((state) => state.OFFERS.status);
	const [id, setId] = useState<null | string>(null);
	const isLoading = offersFetchingStatus === RequestStatus.Pending;
	const hasOffers = offersByCity[selectedCity] && offersByCity[selectedCity].length > 0;

	useEffect(() => {
		if (isAuthorized) {
			favoriteActions.fetchFavorites();
		}
	}, [isAuthorized, favoriteActions]);

	function handleMouseEnter(offerId: string): void {
		setId(offerId);
	}

	function handleMouseLeave(): void {
		setId(null);
	}

	return (
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 cities</title>
			</Helmet>
			<Header />
			<main className={classNames('page__main page__main--index', {
				'page__main--index-empty' : !hasOffers,
			})}
			>
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<CityList/>
					</section>
				</div>
				<div className="cities">
					{isLoading && <Spinner />}
					{hasOffers ?
						<OffersList
							offersByCity={offersByCity}
							selectedCity={selectedCity}
							currentOffer={id}
							handleMouseEnter={handleMouseEnter}
							handleMouseLeave={handleMouseLeave}
						/>
						: <EmptyOffers selectedCity={selectedCity} />}
				</div>
			</main>
		</div>
	);
}

export default MainPage;
