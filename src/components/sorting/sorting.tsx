import { KeyboardEvent, useState } from 'react';
import { SortingMap } from '../../const';
import classNames from 'classnames';

type SortingType = keyof typeof SortingMap;

type SortingPros = {
	currentSorting: SortingType;
	onChange: (sortingType: SortingType) => void;
}

function Sorting({ currentSorting, onChange }: SortingPros): React.JSX.Element {
	const [isOpened, setIsOpened] = useState(false);

	const iconStyle = {
		transform: `translateY(-50%) ${isOpened ? 'rotate(180deg)' : ''}`
	};

	function handleEscKeydown(evt: KeyboardEvent) {
		if (evt.key === 'Escape' && isOpened) {
			evt.preventDefault();
			setIsOpened(false);
		}
	}

	function handleTypeClick() {
		setIsOpened((prevState) => !prevState);
	}

	function handleSortingItemClick(type: SortingType) {
		onChange(type);
		setIsOpened(false);
	}

	return (
		<form
			className="places__sorting"
			action="#"
			method="get"
			onKeyDown={handleEscKeydown}
			onClick={handleTypeClick}
		>
			<span className="places__sorting-caption">Sort by</span>
			{' '}
			<span
				className="places__sorting-type"
				tabIndex={0}
			>
				{SortingMap[currentSorting]}
				<svg
					className="places__sorting-arrow"
					width={7}
					height={4}
					style={iconStyle}
				>
					<use xlinkHref="#icon-arrow-select" />
				</svg>
			</span>
			<ul className={classNames('places__options', 'places__options--custom', {
				'places__options--opened': isOpened
			})}
			>
				{(
					Object.entries(SortingMap)).map(([type, label]) => (
					<li
						key={type}
						className={classNames('places__option', {
							'places__option--active': currentSorting === type,
						})}
						tabIndex={0}
						onClick={() => handleSortingItemClick(type as SortingType)}
					>
						{label}
					</li>
				))}

			</ul>
		</form>
	);
}

export default Sorting;
