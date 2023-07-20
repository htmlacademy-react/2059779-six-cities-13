import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import classNames from 'classnames';
import Header from '../components/header/header';
import OfferCard from '../components/offer-card/offer-card';
import type { Offer } from '../mocks/offers';
import { CITIES } from '../const';
import { getOffersByCity } from '../utils';

type MainPageProps = {
	offers: Offer[];
}

function MainPage({ offers }: MainPageProps): React.JSX.Element {

	const [id, setId] = useState<null | string>(null);
	const [selectedCity, setCity] = useState<string>(CITIES[0]);
	//Нужно где-то придумать и поставить условие, что если предложений нет, нужно выводить страницу с пустых оферов. Пока не придумал, как это сделать.
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
					<div className="cities__places-container container">
						<section className="cities__places places">
							<h2 className="visually-hidden">Places</h2>
							<b className="places__found">{offersByCity[selectedCity].length} places to stay in {selectedCity}</b>
							<form className="places__sorting" action="#" method="get">
								<span className="places__sorting-caption">Sort by</span>
								{' '}
								<span className="places__sorting-type" tabIndex={0}>
									Popular
									<svg className="places__sorting-arrow" width={7} height={4}>
										<use xlinkHref="#icon-arrow-select" />
									</svg>
								</span>
								<ul className="places__options places__options--custom places__options--opened">
									<li
										className="places__option places__option--active"
										tabIndex={0}
									>
										Popular
									</li>
									<li className="places__option" tabIndex={0}>
										Price: low to high
									</li>
									<li className="places__option" tabIndex={0}>
										Price: high to low
									</li>
									<li className="places__option" tabIndex={0}>
										Top rated first
									</li>
								</ul>
							</form>
							<div className="cities__places-list places__list tabs__content">
								{offersByCity[selectedCity].map((offer) => <OfferCard item={offer} onMouseEnter={() => handleMouseEnter(offer.id)} onMouseLeave={handleMouseLeave} key={offer.id} />)}
							</div>
						</section>
						<div className="cities__right-section">
							<section className="cities__map map" />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainPage;
