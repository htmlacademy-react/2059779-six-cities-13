import { Link } from 'react-router-dom';

// type TLogoProps = {
// 	extraClass?: string;
// }

const LOGO_WIDTH = '81';
const LOGO_HEIGHT = '41';

function Logo(): React.JSX.Element {
	return (
		<Link className={'header__logo-link'} to="/">
			<img
				className="header__logo"
				src="img/logo.svg"
				alt="6 cities logo"
				width={LOGO_WIDTH}
				height={LOGO_HEIGHT}
			/>
		</Link>
	);
}

export default Logo;
