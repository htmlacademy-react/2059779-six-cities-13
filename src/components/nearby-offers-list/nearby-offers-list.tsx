import OfferCard from '../offer-card/offer-card';
import { TOffer } from '../../mocks/offers';

type NearbyOffersListProps = {
	nearbyOffers: TOffer[];
	parentCSSClass?: string;
};

function NearbyOffersList({ nearbyOffers, parentCSSClass }: NearbyOffersListProps): React.JSX.Element {
	return (
		<div className="container">
			<section className="near-places places">
				<h2 className="near-places__title">
					Other places in the neighbourhood
				</h2>
				<div className="near-places__list places__list">
					{nearbyOffers.map((offer) => <OfferCard item={offer} parentCSSClass={parentCSSClass} key={offer.id} />)}
				</div>
			</section>
		</div>
	);
}

export default NearbyOffersList;
