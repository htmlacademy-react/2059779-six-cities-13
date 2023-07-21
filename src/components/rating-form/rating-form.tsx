import { useState } from 'react';

function RatingForm() {
	const [selectedValue, setSelectedValue] = useState(0);

	return (
		<div className="reviews__rating-form form__rating">
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={5}
				id="5-stars"
				type="radio"
				checked={selectedValue === 5}
				onChange={() => setSelectedValue(5)}
			/>
			<label
				htmlFor="5-stars"
				className="reviews__rating-label form__rating-label"
				title="perfect"
			>
				<svg className="form__star-image" width={37} height={33} role="img" aria-labelledby="5-stars">
					<title>Perfect</title>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={4}
				id="4-stars"
				type="radio"
				checked={selectedValue === 4}
				onChange={() => setSelectedValue(4)}
			/>
			<label
				htmlFor="4-stars"
				className="reviews__rating-label form__rating-label"
				title="good"
			>
				<svg className="form__star-image" width={37} height={33} role="img" aria-labelledby="4-stars">
					<title>Good</title>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={3}
				id="3-stars"
				type="radio"
				checked={selectedValue === 3}
				onChange={() => setSelectedValue(3)}
			/>
			<label
				htmlFor="3-stars"
				className="reviews__rating-label form__rating-label"
				title="not bad"
			>
				<svg className="form__star-image" width={37} height={33} role="img" aria-labelledby="3-stars">
					<title>Not bad</title>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={2}
				id="2-stars"
				type="radio"
				checked={selectedValue === 2}
				onChange={() => setSelectedValue(2)}
			/>
			<label
				htmlFor="2-stars"
				className="reviews__rating-label form__rating-label"
				title="badly"
			>
				<svg className="form__star-image" width={37} height={33} role="img" aria-labelledby="2-stars">
					<title>Badly</title>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={1}
				id="1-star"
				type="radio"
				checked={selectedValue === 1}
				onChange={() => setSelectedValue(1)}
			/>
			<label
				htmlFor="1-star"
				className="reviews__rating-label form__rating-label"
				title="terribly"
			>
				<svg className="form__star-image" width={37} height={33} role="img" aria-labelledby="5-stars">
					<title>Terribly</title>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
		</div>
	);
}

export default RatingForm;
