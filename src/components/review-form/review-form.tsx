import { useState } from 'react';
import { ChangeEvent } from 'react';
import RatingForm from '../rating-form/rating-form';

function ReviewForm() {
	//Есть сомнения, что пустая строка в первом случае валидное значение для radio-button.
	const [comment, setComment] = useState('');
	const isValid = comment.length >= 50 && comment.length < 300;

	function handleTextChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
		setComment(target.value);
	}

	return (
		<form className="reviews__form form" action="#" method="post">
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<RatingForm />
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
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
	);
}

export default ReviewForm;
