import { FormEvent, useEffect, useRef, useState } from 'react';
import RatingForm from '../rating-form/rating-form';
import { useActionCreators, useAppSelector } from '../../hooks';
import { reviewsActions } from '../../store/slices/reviews';

type THTMLReviewForm = HTMLFormElement & {
	rating: RadioNodeList;
	comment: HTMLTextAreaElement;
}

function ReviewForm(): React.JSX.Element {
	const [isSubmitDisabled, setSubmitDisabled] = useState(true);
	const [isFormDisabled, setFormDisabled] = useState(false);
	const formRef = useRef<THTMLReviewForm>(null);
	const {postReview} = useActionCreators(reviewsActions);
	const offerId = useAppSelector((state) => state.OFFER.offer?.id) as string;

	useEffect(() => () => formRef.current?.reset(), [offerId]);

	function handleInput(event: FormEvent<HTMLFormElement>) {
		const form = event.currentTarget as THTMLReviewForm;
		const review = form.comment.value;
		const rating = form.rating.value;
		setSubmitDisabled(review.length <= 50 || review.length > 300 || rating === '0');
	}

	const handleSuccess = () => {
		setFormDisabled(false);
		formRef.current?.reset();
	};

	const handleError = () => {
		setFormDisabled(false);
		setSubmitDisabled(false);
	};

	const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setSubmitDisabled(true);
		setFormDisabled(true);

		const form = evt.currentTarget as THTMLReviewForm;
		postReview({
			reviewData: {
				comment: form.comment.value,
				rating: Number(form.rating.value),
			},
			offerId
		})
			.unwrap()
			.then(handleSuccess, handleError);
	};

	return (
		<form
			onSubmit={handleSubmitForm}
			onInput={handleInput}
			className="reviews__form form"
			action="#"
			method="post"
			ref={formRef}
		>
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<RatingForm disabled={isFormDisabled} />
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="comment"
				placeholder="Tell how was your stay, what you like and what can be improved"
				required
				title='Your review must be between 50 and 300 characters.'
				minLength={50}
				maxLength={500}
				defaultValue=''
				disabled={isFormDisabled}
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
					disabled={isSubmitDisabled}
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default ReviewForm;
