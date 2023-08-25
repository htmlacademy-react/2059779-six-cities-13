//import { ChangeEvent, useState } from 'react';

type TRatingOptionProps = {
	value: number;
	label: string;
	isChecked?: boolean;
	disabled?: boolean;
}

type TRatingFormProps = {
	disabled?: boolean;
}

function RatingOption({ value, label, isChecked, disabled = false }: TRatingOptionProps): React.JSX.Element {
	return (
		<>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={value}
				id={`${value}-stars`}
				type="radio"
				defaultChecked={isChecked}
				disabled={disabled}
			/>
			<label
				aria-label={label}
				htmlFor={`${value}-stars`}
				className="reviews__rating-label form__rating-label"
				title={label}
			>
				<svg
					className="form__star-image"
					width={37}
					height={33}
					aria-hidden
				>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
		</>
	);
}

function RatingForm({ disabled = false }: TRatingFormProps): React.JSX.Element {

	return (
		<div className="reviews__rating-form form__rating">
			<RatingOption value={5} label='perfect' disabled={disabled} />
			<RatingOption value={4} label='good' disabled={disabled} />
			<RatingOption value={3} label='not bad' disabled={disabled} />
			<RatingOption value={2} label='badly' disabled={disabled} />
			<RatingOption value={1} label='terribly' disabled={disabled} />
		</div>
	);
}

export default RatingForm;
