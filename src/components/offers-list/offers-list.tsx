import OfferCard from '../offer-card/offer-card';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { Offer } from '../../mocks/offers';

type OfferListProps = {
	offersByCity: Record<string, Offer[]>;
	selectedCity: string;
	currentOffer: string | null;
	handleMouseEnter: (offerId: string) => void;
	handleMouseLeave: () => void;
}

function OffersList({ offersByCity, selectedCity, currentOffer, handleMouseEnter, handleMouseLeave }: OfferListProps): React.JSX.Element {

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
					{offersByCity[selectedCity].map((offer) => <OfferCard item={offer} parentCSSClass='cities' onMouseEnter={() => handleMouseEnter(offer.id)} onMouseLeave={handleMouseLeave} key={offer.id} />)}
				</div>
			</section>
			<div className="cities__right-section">
				<LeafletMap city={offersByCity[selectedCity][0]} offers={offersByCity[selectedCity]} selectedOfferId={currentOffer} className={'cities__map map'} />
			</div>
		</div>
	);
}

export default OffersList;
