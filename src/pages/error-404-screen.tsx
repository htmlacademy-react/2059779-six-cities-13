import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Error404Screen(): JSX.Element {
	return (
		<div className="page__favorites-container container">
			<Helmet>
				<title>Page Not Found</title>
			</Helmet>
			<section className="favorites favorites--empty">
				<h1>Page Not Found</h1>
				<div className="favorites__status-wrapper">
					<p className="favorites__status-description">
						<Link to="/">To main page</Link>
					</p>
				</div>
			</section>
		</div>
	);
}

export default Error404Screen;
