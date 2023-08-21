import { capitalizeFirstLetter } from '../../utils';

type TFeaturesListProps = {
	bedrooms: number;
	maxAdults: number;
	type: string;
}

function FeaturesList({ bedrooms, maxAdults, type }: TFeaturesListProps): React.JSX.Element {
	return (
		<ul className="offer__features">
			<li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
			<li className="offer__feature offer__feature--bedrooms">
				{bedrooms} Bedrooms
			</li>
			<li className="offer__feature offer__feature--adults">
				Max {maxAdults} adults
			</li>
		</ul>
	);
}

export default FeaturesList;
