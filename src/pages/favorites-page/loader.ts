import { store } from '../../store';
import { fetchFavorites } from '../../store/thunks/favorites';

export const loadFavoritesPageData = () => store.dispatch(fetchFavorites());
