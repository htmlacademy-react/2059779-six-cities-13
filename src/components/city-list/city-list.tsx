import classNames from 'classnames';
import { CITIES } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks';
import { offersActions } from '../../store/slices/offers';

function CityList(): React.JSX.Element {
	const actions = useActionCreators(offersActions);
	const selectedCity = useAppSelector((state) => state.OFFERS.selectedCity);

	return (
		<ul className="locations__list tabs__list">
			{CITIES.map((city) => (
				<li className="locations__item" key={city}>
					<a
						className={classNames(
							'locations__item-link tabs__item', { 'tabs__item--active': city === selectedCity })}
						href={`#${city.toLowerCase()}`}
						onClick={() => {
							actions.selectCity(city);
						}}
					>
						<span>{city}</span>
					</a>
				</li>
			))}
		</ul>
	);
}

export default CityList;
