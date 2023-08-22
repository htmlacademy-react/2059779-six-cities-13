type TRatingProps = {
	parentCSSClass: string;
	rating: number;
	isLabeled?: boolean;
}

function Rating({ parentCSSClass, rating, isLabeled = false }: TRatingProps): React.JSX.Element {

	const wrapperClass = `${parentCSSClass}__rating rating`;
	const starsClass = `${parentCSSClass}__stars rating__stars`;
	const labelClass = `${parentCSSClass}__rating-value rating__value`;

	return (
		<div className={wrapperClass}>
			<div className={starsClass}>
				<span style={{ width: `${Math.round(rating) * 20}%` }} />
				<span className="visually-hidden">Rating</span>
			</div>
			{isLabeled && (<span className={labelClass}>{rating}</span>)}
		</div>
	);
}

export default Rating;
