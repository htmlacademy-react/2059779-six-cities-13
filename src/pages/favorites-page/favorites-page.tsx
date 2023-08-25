import { Helmet } from 'react-helmet-async';
import { TOffer } from '../../types/offer';
import { getOffersByCity } from '../../utils';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty-page';
import { Link } from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import classNames from 'classnames';

function FavoritesPage(): React.JSX.Element {
	const offers = useAppSelector((state) => state.Favorites.favorites);
	const hasOffers = offers && offers.length > 0;
	const parentClass = 'favorites';

	const offersByCity: Record<string, TOffer[]> = getOffersByCity(offers);

	return (
		<div className={classNames('page', {'page--favorites-empty' : !hasOffers}) }>
			<Helmet>
				<title>6 Cities — Favorites</title>
			</Helmet>
			<Header />
			{hasOffers
				? (
					<main className="page__main page__main--favorites">
						<div className="page__favorites-container container">
							<section className="favorites">
								<h1 className="favorites__title">Saved listing</h1>
								<ul className="favorites__list">
									{Object.entries(offersByCity).map(([city, housings]) => (
										<li key={city} className="favorites__locations-items">
											<div className="favorites__locations locations locations--current">
												<div className="locations__item">
													<Link className="locations__item-link" to={`../#${city}`}>
														<span>{city}</span>
													</Link>
												</div>
											</div>
											<div className="favorites__places">
												{housings.map((item) => (
													<OfferCard
														item={item}
														parentCSSClass={parentClass}
														imgHeight={110}
														imgWidth={150}
														key={item.id}
													/>))}
											</div>
										</li>
									))}
								</ul>
							</section>
						</div>
					</main>
				)
				: <FavoritesEmpty />}
			<Footer />
		</div>
	);
}

export default FavoritesPage;
