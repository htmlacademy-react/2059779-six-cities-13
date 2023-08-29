import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import Sorting, { SortingType } from '../sorting/sorting';
import { pluralIntl, sorting } from '../../utils';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { TOffer } from '../../types/offer';
import { useActionCreators } from '../../hooks';
import { offerActions } from '../../store/slices/offer';

type OfferListProps = {
	offersByCity: Record<string, TOffer[]>;
	selectedCity: string;
}

function OffersList({ offersByCity, selectedCity }: OfferListProps): React.JSX.Element {
	const [currentSorting, setCurrentSorting] = useState<SortingType>('Popular');
	const { highlightOffer } = useActionCreators(offerActions);
	const parentClass = 'cities';
	const imgHeight = 200;
	const imgWidth = 260;
	const getPlaceWord = (count: number) => {
		const pluralKey = pluralIntl.select(count);
		if (pluralKey === 'one') {
			return 'place';
		}

		return 'places';
	};

	const count = offersByCity[selectedCity].length;

	return (
		<div className="cities__places-container container">
			<section className="cities__places places">
				<h2 className="visually-hidden">Places</h2>
				<b className="places__found">{count} {getPlaceWord(count)} to stay in {selectedCity}</b>
				<Sorting currentSorting={currentSorting} onChange={setCurrentSorting} />
				<div className="cities__places-list places__list tabs__content">
					{sorting[currentSorting](offersByCity[selectedCity]).map((offer) => (
						<OfferCard
							item={offer}
							parentCSSClass={parentClass}
							imgHeight={imgHeight}
							imgWidth={imgWidth}
							key={offer.id}
							highlightOffer={highlightOffer}
						/>
					))}
				</div>
			</section>
			<div className="cities__right-section">
				<LeafletMap
					city={offersByCity[selectedCity][0].city}
					offers={offersByCity[selectedCity]}
					className={'cities__map map'}
				/>
			</div>
		</div>
	);
}

export default OffersList;
