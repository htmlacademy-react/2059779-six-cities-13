import { Helmet } from 'react-helmet-async';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import FavoriteOfferCard from '../components/favorite-offer-card/favorite-offer-card';
import { Offer } from '../mocks/offers';
import { getOffersByCity } from '../utils';

type FavoritesProps = {
	offers: Offer[];
}

function FavoritesPage({ offers }: FavoritesProps): React.JSX.Element {

	const offersByCity: Record<string, Offer[]> = getOffersByCity(offers);

	return (
		<div className="page">
			<Helmet>
				<title>6 Cities — Favorites</title>
			</Helmet>
			<Header />
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