import { TReview } from '../../types/review';
import { REVIEW_DATE_FORMATE, REVIEW_DATE_ATTRIBUTE_FORMATE } from '../../const';
import Rating from '../rating/rating';

type ReviewPropsType = {
	review: TReview;
}

function Review({ review }: ReviewPropsType): React.JSX.Element {
	const parentClass = 'reviews';
	const { user, rating, comment } = review;
	const date = new Date(review.date);
	const formattedDate = (new Intl.DateTimeFormat('en-US', REVIEW_DATE_FORMATE).format(date));
	const formattedAttributeDate = (new Intl.DateTimeFormat('en-US', REVIEW_DATE_ATTRIBUTE_FORMATE).format(date)).replace(/\//g, '-');
	return (
		<li className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<img
						className="reviews__avatar user__avatar"
						src={user.avatarUrl}
						alt="Reviews avatar"
						width={54}
						height={54}
					/>
				</div>
				<span className="reviews__user-name">{user.name}</span>
				{user.isPro && <small className="reviews__user-status">Pro</small>}
			</div>
			<div className="reviews__info">
				<Rating
					parentCSSClass={parentClass}
					rating={rating}
				/>
				<p className="reviews__text">
					{comment}
				</p>
				<time className="reviews__time" dateTime={formattedAttributeDate}>
					{formattedDate}
				</time>
			</div>
		</li>
	);
}

export default Review;
