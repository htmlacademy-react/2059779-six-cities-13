import classNames from 'classnames';
import { CITIES } from '../../const';
import { selectCity } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../hooks';

function CityList(): React.JSX.Element {
	const selectedCity = useAppSelector((state) => state.OFFERS.selectedCity);
	const dispatch = useAppDispatch();


	return (
		<ul className="locations__list tabs__list">
			{CITIES.map((city) => (
				<li className="locations__item" key={city}>
					<a
						className={classNames(
							'locations__item-link tabs__item', { 'tabs__item--active': city === selectedCity })}
						href={`#${city.toLowerCase()}`}
						onClick={() => {
							dispatch(selectCity(city));
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
