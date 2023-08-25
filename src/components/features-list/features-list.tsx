import { capitalizeFirstLetter, pluralIntl } from '../../utils';

type TFeaturesListProps = {
	bedrooms: number;
	maxAdults: number;
	type: string;
}

function FeaturesList({ bedrooms, maxAdults, type }: TFeaturesListProps): React.JSX.Element {

	const getBedroomWord = (count: number) => {
		const pluralKey = pluralIntl.select(count);
		if (pluralKey === 'one') {
			return 'bedroom';
		}

		return 'bedrooms';
	};

	const getAdultWord = (count: number) => {
		const pluralKey = pluralIntl.select(count);
		if (pluralKey === 'one') {
			return 'adult';
		}

		return 'adults';
	};

	return (
		<ul className="offer__features">
			<li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
			<li className="offer__feature offer__feature--bedrooms">
				{bedrooms} {capitalizeFirstLetter(getBedroomWord(bedrooms))}
			</li>
			<li className="offer__feature offer__feature--adults">
				Max {maxAdults} {getAdultWord(maxAdults)}
			</li>
		</ul>
	);
}

export default FeaturesList;
