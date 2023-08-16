import { Helmet } from 'react-helmet-async';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import FavoriteOfferCard from '../components/favorite-offer-card/favorite-offer-card';
import { TOffer } from '../types/offer';
import { getOffersByCity } from '../utils';
import { AUTH_STATUS } from '../const';
import { useAppSelector } from '../hooks';

function FavoritesPage(): React.JSX.Element {
	const offers = useAppSelector((state) => state.offers);

	const offersByCity: Record<string, TOffer[]> = getOffersByCity(offers);

	return (
		<div className="page">
			<Helmet>
				<title>6 Cities — Favorites</title>
			</Helmet>
			<Header authStatus={AUTH_STATUS} />
			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							{Object.entries(offersByCity).map(([city, housings]) => (
								<li key={city} className="favorites__locations-items">
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<a className="locations__item-link" href="#">
												<span>{city}</span>
											</a>
										</div>
									</div>
									<div className="favorites__places">
										{housings.map((item) => <FavoriteOfferCard item={item} key={item.id} />)}
									</div>
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default FavoritesPage;
