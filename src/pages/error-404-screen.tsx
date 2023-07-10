import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

function Error404Screen(): JSX.Element {
	return (
		<div className="page">
			<Helmet>
				<title>Page Not Found</title>
			</Helmet>
			<Header />
			<main className="page__main">
				<section className="favorites favorites--empty">
					<h1>Page Not Found</h1>
					<div className="favorites__status-wrapper">
						<p className="favorites__status-description">
							<Link to="/">To main page</Link>
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Error404Screen;
