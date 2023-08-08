import { KeyboardEvent, useState } from 'react';
import { SortingMap } from '../../const';

type SortingBoxPros = {
	currentSorting: string;
	onChange: (sortingType: string) => void;
}

function Sorting({ currentSorting, onChange }: SortingBoxPros): React.JSX.Element {
	const [isOpened, setIsOpened] = useState(false);

	function handleEscKeydown(evt: KeyboardEvent) {
		if (evt.key === 'Escape' && isOpened) {
			evt.preventDefault();
			setIsOpened(false);
		}
	}

	function handleTypeClick() {
		setIsOpened((prevState) => !prevState);
	}

	function handleSortingItemClick(type: string) {
		onChange(type);
		setIsOpened(false);
	}

	return (
		<form
			className="places__sorting"
			action="#"
			method="get"
			onKeyDown={handleEscKeydown}
		>
			<span className="places__sorting-caption">Sort by</span>
			{' '}
			<span
				className="places__sorting-type"
				tabIndex={0}
				onClick={handleTypeClick}
			>
				{SortingMap[currentSorting]}
				<svg className="places__sorting-arrow" width={7} height={4}>
					<use xlinkHref="#icon-arrow-select" />
				</svg>
			</span>
			<ul className="places__options places__options--custom places__options--opened">
				{Object.entries(SortingMap)[Symbol].map(([type, label])) => (
				<li
					key={type}
					className="places__option" tabIndex={0}
					onClick={() => handleSortingItemClick(type)}
				>
					{label}
				</li>
				)}


				<li
					className="places__option places__option--active"
					tabIndex={0}
				>
					Popular
				</li>
				<li className="places__option" tabIndex={0}>
					Price: low to high
				</li>
				<li className="places__option" tabIndex={0}>
					Price: high to low
				</li>
				<li className="places__option" tabIndex={0}>
					Top rated first
				</li>
			</ul>
		</form>
	);
}

export default Sorting;
