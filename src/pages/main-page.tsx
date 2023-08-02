import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Header from '../components/header/header';
import OffersList from '../components/offers-list/offers-list';
import EmptyOffers from '../components/empty-offers/empty-offers';
import CityList from '../components/city-list/city-list';
import type { Offer } from '../mocks/offers';
import { getOffersByCity } from '../utils';
import { CITIES, AUTH_STATUS } from '../const';
import { useSelector } from 'react-redux';

type MainPageProps = {
	offers: Offer[];
}

function MainPage({ offers }: MainPageProps): React.JSX.Element {

	const [id, setId] = useState<null | string>(null);
	//const [selectedCity, setCity] = useState<string>(CITIES[0]);
	const offersByCity = getOffersByCity(offers);
	const selectedCity = useSelector((state) => state.selectCity);

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
						<ul className="locations__list tabs__list">
							<CityList/>
						</ul>
					</section>
				</div>
				<div className="cities">
					{offersByCity[selectedCity] && offersByCity[selectedCity].length > 0 ? <OffersList offersByCity={offersByCity} selectedCity={selectedCity} currentOffer={id} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} /> : <EmptyOffers />}
				</div>
			</main>
		</div>
	);
}

export default MainPage;
