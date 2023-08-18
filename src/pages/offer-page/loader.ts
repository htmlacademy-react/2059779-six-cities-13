import { LoaderFunctionArgs } from 'react-router-dom';
import { store } from '../../store';
import { fetchOffer, fetchNearByOffers } from '../../store/thunks/offers';
import { fetchReviews } from '../../store/thunks/reviews';

export function loadOfferData({ params }: LoaderFunctionArgs) {
	const id: string | undefined = params.offerId;
	if (!id) {
		return new Response('Offer not found', { status: 404 });
	}

	Promise.all([
		store.dispatch(fetchOffer(id)),
		store.dispatch(fetchNearByOffers(id)),
		store.dispatch(fetchReviews(id))
	]);

	return 1;
}
