import { store } from '../../store';
import { fetchOffers } from '../../store/thunks/offers';

export const loadMainPageData = () => store.dispatch(fetchOffers());
