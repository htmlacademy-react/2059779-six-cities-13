import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import Header from '../components/header/header';
import Review from '../components/review/review';
import ReviewForm from '../components/review-form/review-form';
import type { FullOffer } from '../mocks/offers';
import type { ReviewType } from '../mocks/reviews';
import { capitalizeFirstLetter } from '../utils';
import { useParams } from 'react-router-dom';

type OfferPagePros = {
	fullOffers: FullOffer[];
	reviews: ReviewType[];
}

function OfferPage({ fullOffers, reviews }: OfferPagePros): React.JSX.Element {
	const { id } = useParams();

	//Наверное я здесь принуждаю TS к плохому, и нужно обработать вариант, если find ничего не найдёт.
	const fullOffer = fullOffers.find((item) => item.id === id) as FullOffer;

	const detailedImages: string[] = fullOffer.images;

	return (
		<div className="page">
			<Helmet>
				<title>6 Cities — Offer</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--offer">
				<section className="offer">
					<div className="offer__gallery-container container">
						<div className="offer__gallery">
							{detailedImages.map((item) => (
								//Здесь в качестве ключа хотел использовать индекс массива. Хз, насколько это плохо в конкретном случае, но что тут ещё можно придумать не знаю. Поставил пока сам УРЛ, потому что бесит ошибками типа, которые я не знаю, как поправить.
								<div key={item} className="offer__image-wrapper">
									<img
										className="offer__image"
										src={item}
										alt="Photo studio"
									/>
								</div>
							))}
						</div>
					</div>
					<div className="offer__container container">
						<div className="offer__wrapper">
							{fullOffer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
							<div className="offer__name-wrapper">
								<h1 className="offer__name">
									{capitalizeFirstLetter(fullOffer.title)}
								</h1>
								<button
									className={classNames(
										'offer__bookmark-button', { 'offer__bookmark-button--active': fullOffer.isFavorite } , 'button')}
									type="button"
								>
									<svg className="offer__bookmark-icon" width={31} height={33}>
										<use xlinkHref="#icon-bookmark" />
									</svg>
									<span className="visually-hidden">To bookmarks</span>
								</button>
							</div>
							<div className="offer__rating rating">
								<div className="offer__stars rating__stars">
									<span style={{ width: `${fullOffer.rating * 20}%` }} />
									<span className="visually-hidden">Rating</span>
								</div>
								<span className="offer__rating-value rating__value">{fullOffer.rating}</span>
							</div>
							<ul className="offer__features">
								<li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(fullOffer.type)}</li>
								<li className="offer__feature offer__feature--bedrooms">
									{fullOffer.bedrooms} Bedrooms
								</li>
								<li className="offer__feature offer__feature--adults">
									Max {fullOffer.maxAdults} adults
								</li>
							</ul>
							<div className="offer__price">
								<b className="offer__price-value">€{fullOffer.price}</b>
								<span className="offer__price-text">&nbsp;night</span>
							</div>
							<div className="offer__inside">
								<h2 className="offer__inside-title">What&apos;s inside</h2>
								<ul className="offer__inside-list">
									{fullOffer.goods.map((good) => (
										<li className="offer__inside-item" key={good}>{good}</li>
									))}
								</ul>
							</div>
							<div className="offer__host">
								<h2 className="offer__host-title">Meet the host</h2>
								<div className="offer__host-user user">
									<div className={classNames(
										'offer__avatar-wrapper', { 'offer__avatar-wrapper--pro': fullOffer.host.isPro }, 'user__avatar-wrapper'
									)}
									>
										<img
											className="offer__avatar user__avatar"
											src={fullOffer.host.avatarUrl}
											alt="Host avatar"
											width={74}
											height={74}
										/>
									</div>
									<span className="offer__user-name">{fullOffer.host.name}</span>
									{fullOffer.host.isPro && <span className="offer__user-status">Pro</span>}
								</div>
								<div className="offer__description">
									<p className="offer__text">
										{fullOffer.description}.
										<br />
										А ниже не совсем понимаю, как быть со вторым параграфом. В примере на сервере вообще одно короткое предложение.
									</p>
									<p className="offer__text">
										An independent House, strategically located between Rembrand
										Square and National Opera, but where the bustle of the city
										comes to rest in this alley flowery and colorful.
									</p>
								</div>
							</div>
							<section className="offer__reviews reviews">
								<h2 className="reviews__title">
									Reviews · <span className="reviews__amount">{reviews.length}</span>
								</h2>
								<ul className="reviews__list">
									{reviews.map((item) => <Review review={item} key={item.id} />)}
								</ul>
								<ReviewForm />
							</section>
						</div>
					</div>
					<section className="offer__map map" />
				</section>
				<div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">
							Other places in the neighbourhood
						</h2>
						<div className="near-places__list places__list">
							<article className="near-places__card place-card">
								<div className="near-places__image-wrapper place-card__image-wrapper">
									<a href="#">
										<img
											className="place-card__image"
											src="img/room.jpg"
											alt="Place image"
											width={260}
											height={200}
										/>
									</a>
								</div>
								<div className="place-card__info">
									<div className="place-card__price-wrapper">
										<div className="place-card__price">
											<b className="place-card__price-value">€80</b>
											<span className="place-card__price-text">/&nbsp;night</span>
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
											<span style={{ width: '80%' }} />
											<span className="visually-hidden">Rating</span>
										</div>
									</div>
									<h2 className="place-card__name">
										<a href="#">Wood and stone place</a>
									</h2>
									<p className="place-card__type">Private room</p>
								</div>
							</article>
							<article className="near-places__card place-card">
								<div className="near-places__image-wrapper place-card__image-wrapper">
									<a href="#">
										<img
											className="place-card__image"
											src="img/apartment-02.jpg"
											alt="Place image"
											width={260}
											height={200}
										/>
									</a>
								</div>
								<div className="place-card__info">
									<div className="place-card__price-wrapper">
										<div className="place-card__price">
											<b className="place-card__price-value">€132</b>
											<span className="place-card__price-text">/&nbsp;night</span>
										</div>
										<button
											className="place-card__bookmark-button button"
											type="button"
										>
											<svg
												className="place-card__bookmark-icon"
												width={18}
												height={19}
											>
												<use xlinkHref="#icon-bookmark" />
											</svg>
											<span className="visually-hidden">To bookmarks</span>
										</button>
									</div>
									<div className="place-card__rating rating">
										<div className="place-card__stars rating__stars">
											<span style={{ width: '80%' }} />
											<span className="visually-hidden">Rating</span>
										</div>
									</div>
									<h2 className="place-card__name">
										<a href="#">Canal View Prinsengracht</a>
									</h2>
									<p className="place-card__type">Apartment</p>
								</div>
							</article>
							<article className="near-places__card place-card">
								<div className="place-card__mark">
									<span>Premium</span>
								</div>
								<div className="near-places__image-wrapper place-card__image-wrapper">
									<a href="#">
										<img
											className="place-card__image"
											src="img/apartment-03.jpg"
											alt="Place image"
											width={260}
											height={200}
										/>
									</a>
								</div>
								<div className="place-card__info">
									<div className="place-card__price-wrapper">
										<div className="place-card__price">
											<b className="place-card__price-value">€180</b>
											<span className="place-card__price-text">/&nbsp;night</span>
										</div>
										<button
											className="place-card__bookmark-button button"
											type="button"
										>
											<svg
												className="place-card__bookmark-icon"
												width={18}
												height={19}
											>
												<use xlinkHref="#icon-bookmark" />
											</svg>
											<span className="visually-hidden">To bookmarks</span>
										</button>
									</div>
									<div className="place-card__rating rating">
										<div className="place-card__stars rating__stars">
											<span style={{ width: '100%' }} />
											<span className="visually-hidden">Rating</span>
										</div>
									</div>
									<h2 className="place-card__name">
										<a href="#">Nice, cozy, warm big bed apartment</a>
									</h2>
									<p className="place-card__type">Apartment</p>
								</div>
							</article>
						</div>
					</section>
				</div>
			</main>
		</div>

	);
}

export default OfferPage;
