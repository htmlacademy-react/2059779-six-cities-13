import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import classNames from 'classnames';
import Header from '../components/header/header';
import OffersList from '../components/offers-list/offers-list';
import EmptyOffers from '../components/empty-offers/empty-offers';
import type { Offer } from '../mocks/offers';
import { getOffersByCity } from '../utils';
import { CITIES } from '../const';


type MainPageProps = {
	offers: Offer[];
}

function MainPage({ offers }: MainPageProps): React.JSX.Element {

	const [id, setId] = useState<null | string>(null);
	const [selectedCity, setCity] = useState<string>(CITIES[0]);
	const offersByCity = getOffersByCity(offers);

	// eslint-disable-next-line no-console
	console.log(id);

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
			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<ul className="locations__list tabs__list">
							{CITIES.map((city) => (
								<li className="locations__item" key={city}>
									<a
										className={classNames(
											'locations__item-link tabs__item', { 'tabs__item--active': city === selectedCity })}
										href={`#${city.toLowerCase()}`}
										onClick={() => setCity(city)}
									>
										<span>{city}</span>
									</a>
								</li>
							))}
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
