import { Helmet } from 'react-helmet-async';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import FavoriteOfferCard from '../components/favorite-offer-card/favorite-offer-card';
import { Offer } from '../mocks/offers';

type FavoritesProps = {
	offers: Offer[];
}

function Favorites({ offers }: FavoritesProps): React.JSX.Element {

	//Что-то никак не могу придумать, как бы половчее дать названия полям, чтобы они были при этом ещё или константами или лучше ключами перечисления.
	const filteredCities = {
		Amsterdam: offers.filter((offer) => offer.city.name === 'Amsterdam')
	};


	return (
		<div className="page">
			<Helmet>
				<title>Favorites</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							<li className="favorites__locations-items">
								<div className="favorites__locations locations locations--current">
									<div className="locations__item">
										<a className="locations__item-link" href="#">
											<span>Amsterdam</span>
										</a>
									</div>
								</div>
								<div className="favorites__places">
									{offers.map((item) => <FavoriteOfferCard item={item} key={item.id} />)}
								</div>
							</li>
							<li className="favorites__locations-items">
								<div className="favorites__locations locations locations--current">
									<div className="locations__item">
										<a className="locations__item-link" href="#">
											<span>Cologne</span>
										</a>
									</div>
								</div>
								<div className="favorites__places">
									<article className="favorites__card place-card">
										<div className="favorites__image-wrapper place-card__image-wrapper">
											<a href="#">
												<img
													className="place-card__image"
													src="img/apartment-small-04.jpg"
													alt="Place image"
													width={150}
													height={110}
												/>
											</a>
										</div>
										<div className="favorites__card-info place-card__info">
											<div className="place-card__price-wrapper">
												<div className="place-card__price">
													<b className="place-card__price-value">€180</b>
													<span className="place-card__price-text">
														/&nbsp;night
													</span>
												</div>
												<button
													className="place-card__bookmark-button place-card__bookmark-button--active button"
													type="button"
												>
													<svg
														className="place-card__bookmark-icon"
														width={18}
														height={19}
													>
														<use xlinkHref="#icon-bookmark" />
													</svg>
													<span className="visually-hidden">In bookmarks</span>
												</button>
											</div>
											<div className="place-card__rating rating">
												<div className="place-card__stars rating__stars">
													<span style={{ width: '100%' }} />
													<span className="visually-hidden">Rating</span>
												</div>
											</div>
											<h2 className="place-card__name">
												<a href="#">White castle</a>
											</h2>
											<p className="place-card__type">Apartment</p>
										</div>
									</article>
								</div>
							</li>
						</ul>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Favorites;
