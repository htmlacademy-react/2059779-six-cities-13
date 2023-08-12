import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Header from '../components/header/header';
import OffersList from '../components/offers-list/offers-list';
import EmptyOffers from '../components/empty-offers/empty-offers';
import CityList from '../components/city-list/city-list';
import Spinner from '../components/spinner/spinner';
import { getOffersByCity } from '../utils';
import { AUTH_STATUS } from '../const';
import { useAppSelector } from '../hooks';

function MainPage(): React.JSX.Element {
	const offers = useAppSelector((state) => state.offers);
	const offersByCity = getOffersByCity(offers);
	//Кастую тип, чтобы ниже не ругалось на undefined, но наверное это всё неправильно.
	const selectedCity = useAppSelector((state) => state.selectedCity) as string;
	const offersFetchingStatus = useAppSelector((state) => state.offersFetchingStatus);
	const [id, setId] = useState<null | string>(null);

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
			<Header authStatus={AUTH_STATUS} />
			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<CityList/>
					</section>
				</div>
				<div className="cities">
					{(offersFetchingStatus === 'Pending') &&	<Spinner />}
					{offersByCity[selectedCity] && offersByCity[selectedCity].length > 0 ? <OffersList offersByCity={offersByCity} selectedCity={selectedCity} currentOffer={id} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} /> : <EmptyOffers />}
				</div>
			</main>
		</div>
	);
}

export default MainPage;
