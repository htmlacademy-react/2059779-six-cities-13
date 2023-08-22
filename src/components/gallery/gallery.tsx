type TGalleryProps = {
	images: string[];
}

function Gallery({ images }: TGalleryProps): React.JSX.Element {
	return (
		<div className="offer__gallery-container container">
			<div className="offer__gallery">
				{images.map((item) => (
					<div key={item} className="offer__image-wrapper">
						<img
							className="offer__image"
							src={item}
							alt="Photo studio"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Gallery;
