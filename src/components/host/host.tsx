import classNames from 'classnames';

type THost = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
}

type THostProps = {
	host: THost;
	description: string;
}

function Host({ host, description }: THostProps): React.JSX.Element {
	return (
		<div className="offer__host">
			<h2 className="offer__host-title">Meet the host</h2>
			<div className="offer__host-user user">
				<div className={classNames(
					'offer__avatar-wrapper', { 'offer__avatar-wrapper--pro': host.isPro }, 'user__avatar-wrapper'
				)}
				>
					<img
						className="offer__avatar user__avatar"
						src={host.avatarUrl}
						alt="Host avatar"
						width={74}
						height={74}
					/>
				</div>
				<span className="offer__user-name">{host.name}</span>
				{host.isPro && <span className="offer__user-status">Pro</span>}
			</div>
			<div className="offer__description">
				<p className="offer__text">
					{description}.
					<br />
					А ниже не совсем понимаю, как быть со вторым параграфом. В примере на сервере вообще одно короткое предложение.
				</p>
				<p className="offer__text">
					An independent House, strategically located between Rembrand
					Square and National Opera, but where the bustle of the city
					comes to rest in this alley flowery and colorful.
				</p>
			</div>
		</div>
	);
}

export default Host;
