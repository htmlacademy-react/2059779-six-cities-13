import { Link } from 'react-router-dom';
import { useActionCreators } from '../../hooks';
import { offersActions } from '../../store/slices/offers';
import { getRandomArrayElement } from '../../utils';
import { CITIES } from '../../const';

function RandomCity() {

	const { selectCity } = useActionCreators(offersActions);
	const randomCity = getRandomArrayElement(CITIES);
	const randomCityAnchor = randomCity.toLowerCase();

	const handleCityClick = () => {
		selectCity(randomCity);
	};
	return (
		<section className="locations locations--login locations--current">
			<div className="locations__item">
				<Link onClick={handleCityClick} className="locations__item-link" to={`/#${randomCityAnchor}`}>
					<span>{randomCity}</span>
				</Link>
			</div>
		</section>
	);
}

export default RandomCity;
