import { FormEvent, useState } from 'react';
import RatingForm from '../rating-form/rating-form';
import { useActionCreators, useAppSelector } from '../../hooks';
import { reviewsActions } from '../../store/slices/reviews';
import { RequestStatus } from '../../const';

type THTMLReviewForm = HTMLFormElement & {
	rating: RadioNodeList;
	comment: HTMLTextAreaElement;
}

function ReviewForm(): React.JSX.Element {
	const actions = useActionCreators(reviewsActions);
	const offerId = useAppSelector((state) => state.OFFER.offer?.id);
	const [isDisabled, setDisabled] = useState(true);

	function handleInput(event: FormEvent<HTMLFormElement>) {
		const form = event.currentTarget as THTMLReviewForm;
		const review = form.comment.value;
		const rating = form.rating.value;
		setDisabled(review.length <= 50 || review.length > 300 || rating === '0');
	}

	const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const form = evt.currentTarget as THTMLReviewForm;
		const formData = new FormData(form);
		const reviewData = Object.fromEntries(formData) as TReviewData;
		reviewData.rating = Number(reviewData.rating);
		actions.postReview({ reviewData, offerId });

		form.reset();
	};

	return (
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
				defaultValue=''
				onChange={handleInput}
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
					disabled={isDisabled}
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default ReviewForm;
