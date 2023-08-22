import OfferCard from '../offer-card/offer-card';
import { TOffer } from '../../types/offer';

type NearbyOffersListProps = {
	nearbyOffers: TOffer[];
};

function NearbyOffersList({ nearbyOffers }: NearbyOffersListProps): React.JSX.Element {

	const parentClass = 'near-places';
	const imgHeight = 200;
	const imgWidth = 260;

	return (
		<div className="container">
			<section className="near-places places">
				<h2 className="near-places__title">
					Other places in the neighbourhood
				</h2>
				<div className="near-places__list places__list">
					{nearbyOffers.map((offer) => (
						<OfferCard
							item={offer}
							parentCSSClass={parentClass}
							imgHeight={imgHeight}
							imgWidth={imgWidth}
							key={offer.id}
						/>))}
				</div>
			</section>
		</div>
	);
}

export default NearbyOffersList;
