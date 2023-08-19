import { FormEvent, useState } from 'react';
import { ChangeEvent } from 'react';
import RatingForm from '../rating-form/rating-form';
import { TReviewData } from '../../types/review';
import { useActionCreators, useAppSelector } from '../../hooks';
import { reviewsActions } from '../../store/slices/reviews';
import { TReview } from '../../types/review';
import { MAX_REVIEW_COUNT } from '../../const';
import Review from '../review/review';
import { useAuth } from '../../hooks/use-authorize';

type ReviewFormProps = {
	reviews: TReview[];
}

function ReviewForm({ reviews }: ReviewFormProps): React.JSX.Element {
	const [comment, setComment] = useState('');
	const isValid = comment.length >= 50 && comment.length < 300;
	const actions = useActionCreators(reviewsActions);
	const offerId = useAppSelector((state) => state.OFFER.offer?.id);

	const isAuthorized = useAuth();

	function handleTextChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
		setComment(target.value);
	}

	const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const form = evt.currentTarget;

		const formData = new FormData(form);
		const reviewData = Object.fromEntries(formData) as TReviewData;
		reviewData.rating = Number(reviewData.rating);
		actions.postReview({ reviewData, offerId });

		//Сделать неуправляемой формой. Без setComment.
		form.reset();
		setComment('');
	};

	return (
		<section className="offer__reviews reviews">
			<h2 className="reviews__title">
				Reviews · <span className="reviews__amount">{reviews.length}</span>
			</h2>
			<ul className="reviews__list">
				{reviews.slice(0, MAX_REVIEW_COUNT).map((item) => <Review review={item} key={item.id} />)}
			</ul>
			{isAuthorized && (
				<form onSubmit={handleSubmitForm} className="reviews__form form" action="#" method="post">
					<label className="reviews__label form__label" htmlFor="review">
						Your review
					</label>
					<RatingForm />
					<textarea
						className="reviews__textarea form__textarea"
						id="review"
						name="comment"
						placeholder="Tell how was your stay, what you like and what can be improved"
						required
						title='Your review must be between 50 and 300 characters.'
						minLength={50}
						maxLength={300}
						value={comment}
						onChange={handleTextChange}
					/>
					<div className="reviews__button-wrapper">
						<p className="reviews__help">
							To submit review please make sure to set{' '}
							<span className="reviews__star">rating</span> and describe
							your stay with at least{' '}
							<b className="reviews__text-amount">50 characters</b>.
						</p>
						<button
							className="reviews__submit form__submit button"
							type="submit"
							disabled={!isValid}
						>
							Submit
						</button>
					</div>
				</form>
			)}
		</section>
	);
}

export default ReviewForm;
