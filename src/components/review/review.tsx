import { TReview } from '../../mocks/reviews';
import { REVIEW_DATE_FORMATE, REVIEW_DATE_ATTRIBUTE_FORMATE } from '../../const';

type ReviewPropsType = {
	review: TReview;
}

function Review({ review }: ReviewPropsType): React.JSX.Element {
	const date = new Date(review.date);
	const formattedDate = (new Intl.DateTimeFormat('en-US', REVIEW_DATE_FORMATE).format(date));
	//Здесь получается обратный порядок. То есть сначала день, потом месяц и год. Есть решение разобрать строку и переставить всё, но выглядит как что-то слишком сложное для такой задачи.
	const formattedAttributeDate = (new Intl.DateTimeFormat('en-US', REVIEW_DATE_ATTRIBUTE_FORMATE).format(date)).replace(/\//g, '-');
	return (
		<li className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<img
						className="reviews__avatar user__avatar"
						src={review.user.avatarUrl}
						alt="Reviews avatar"
						width={54}
						height={54}
					/>
				</div>
				<span className="reviews__user-name">{review.user.name.split(' ')[0]}</span>
				{review.user.isPro && <small className="reviews__user-status">Pro</small>}
			</div>
			<div className="reviews__info">
				<div className="reviews__rating rating">
					<div className="reviews__stars rating__stars">
						<span style={{ width: `${review.rating * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<p className="reviews__text">
					{review.comment}.
				</p>
				<time className="reviews__time" dateTime={formattedAttributeDate}>
					{formattedDate}
				</time>
			</div>
		</li>
	);
}

export default Review;
