import classNames from 'classnames';
import { CITIES } from '../../const';
import { selectCity } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

function CityList(): React.JSX.Element {
	const selectedCity = useSelector((state) => state.selectCity);
	const dispatch = useDispatch();


	return (
		CITIES.map((city) => (
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
		))
	);
}

export default CityList;
