type TPriceProps = {
	price: number;
	parentCSSClass: string;
	divider?: string;
}

function Price({ price, parentCSSClass, divider }: TPriceProps): React.JSX.Element {

	const wrapperClass = `${parentCSSClass}__price`;
	const valueClass = `${parentCSSClass}__price-value`;
	const textClass = `${parentCSSClass}__price-text`;

	return (
		<div className={wrapperClass}>
			<b className={valueClass}>€{price}</b>
			<span className={textClass}>{divider}&nbsp;night</span>
		</div>
	);
}

export default Price;
