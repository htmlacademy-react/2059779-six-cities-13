import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import classNames from 'classnames';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import EmptyOffers from '../../components/empty-offers/empty-offers';
import CityList from '../../components/city-list/city-list';
import Spinner from '../../components/spinner/spinner';
import { getOffersByCity } from '../../utils';
import { RequestStatus } from '../../const';

function MainPage(): React.JSX.Element {
	const offers = useAppSelector((state) => state.OFFERS.offers);
	const offersByCity = getOffersByCity(offers);
	const selectedCity = useAppSelector((state) => state.OFFERS.selectedCity);
	const offersFetchingStatus = useAppSelector((state) => state.OFFERS.status);
	const isLoading = offersFetchingStatus === RequestStatus.Pending;
	const hasOffers = offersByCity[selectedCity] && offersByCity[selectedCity].length > 0;

	return (
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 cities</title>
			</Helmet>
			<Header />
			<main className={classNames('page__main page__main--index', {
				'page__main--index-empty' : !hasOffers,
			})}
			>
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<CityList/>
					</section>
				</div>
				<div className="cities">
					{isLoading && <Spinner />}
					{hasOffers ?
						<OffersList
							offersByCity={offersByCity}
							selectedCity={selectedCity}
						/>
						: <EmptyOffers selectedCity={selectedCity} />}
				</div>
			</main>
		</div>
	);
}

export default MainPage;
