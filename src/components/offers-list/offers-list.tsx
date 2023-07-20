import OfferCard from '../offer-card/offer-card';
import { getOffersByCity } from '../../utils';
import { Offer } from '../../mocks/offers';

type OfferListProps = {
	offers: Offer[];
	selectedCity: string;
	handleMouseEnter: void;
	handleMouseLeave: void;
}

function OffersList({ offers, selectedCity, handleMouseEnter, handleMouseLeave }: OfferListProps): React.JSX.Element {

	const offersByCity = getOffersByCity(offers);

	return (
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
	);
}

export default OffersList;
