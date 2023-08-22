//import { ChangeEvent, useState } from 'react';

type RatingOptionProps = {
	value: number;
	label: string;
	isChecked?: boolean;
}

function RatingOption({ value, label, isChecked }: RatingOptionProps): React.JSX.Element {
	return (
		<>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={value}
				id={`${value}-stars`}
				type="radio"
				defaultChecked={isChecked}
			/>
			<label
				htmlFor={`${value}-stars`}
				className="reviews__rating-label form__rating-label"
				title="perfect"
			>
				<svg className="form__star-image" width={37} height={33} role="img" aria-labelledby={`${value}-stars`}>
					<title>{label}</title>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
		</>
	);
}

function RatingForm(): React.JSX.Element {

	return (
		<div className="reviews__rating-form form__rating">
			<RatingOption value={5} label='Perfect' />
			<RatingOption value={4} label='Good' />
			<RatingOption value={3} label='Not bad' />
			<RatingOption value={2} label='Badly' />
			<RatingOption value={1} label='Terribly' isChecked />
		</div>
	);
}

export default RatingForm;
