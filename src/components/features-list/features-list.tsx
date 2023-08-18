type TFeaturesListProps = {
	features: string[];
}

function FeaturesList({ features }: TFeaturesListProps): React.JSX.Element {
	return (
		<div className="offer__inside">
			<h2 className="offer__inside-title">What&apos;s inside</h2>
			<ul className="offer__inside-list">
				{features.map((item) => (
					<li className="offer__inside-item" key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
}

export default FeaturesList;
