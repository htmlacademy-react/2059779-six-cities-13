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
				<section className="error404 container">
					<h1 className="error404__title">Page Not Found</h1>
					<img className="error404__image" src="/img/404.webp" alt="Foundation without a house." width={720} height={480} />
					<p className="error404__text">
						<Link className="error404__link" to="/">To main page &#x1F3E0; </Link>
					</p>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Error404Screen;
