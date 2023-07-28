import classNames from 'classnames';
import { CITIES } from '../../const';

type CityListProps = {
	selectedCity: string;
	onClick: (city: string) => void;
}

function CityList({selectedCity, onClick}: CityListProps): React.JSX.Element {
	return (
		CITIES.map((city) => (
			<li className="locations__item" key={city}>
				<a
					className={classNames(
						'locations__item-link tabs__item', { 'tabs__item--active': city === selectedCity })}
					href={`#${city.toLowerCase()}`}
					onClick={() => onClick(city)}
				>
					<span>{city}</span>
				</a>
			</li>
		))
	);
}

export default CityList;
