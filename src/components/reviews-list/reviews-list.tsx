import { TReview } from '../../types/review';
import { MAX_REVIEW_COUNT } from '../../const';
import { useAuth } from '../../hooks/use-authorize';
import Review from '../review/review';
import ReviewForm from '../review-form/review-form';

type ReviewsListProps = {
	reviews: TReview[];
}

function ReviewsList({ reviews }: ReviewsListProps): React.JSX.Element {
	const isAuthorized = useAuth();


	return (
		<section className="offer__reviews reviews">
			<h2 className="reviews__title">
				Reviews · <span className="reviews__amount">{reviews.length}</span>
			</h2>
			<ul className="reviews__list">
				{reviews.slice(0, MAX_REVIEW_COUNT).map((item) => <Review review={item} key={item.id} />)}
			</ul>
			{isAuthorized && <ReviewForm />}
		</section>
	);
}

export default ReviewsList;
