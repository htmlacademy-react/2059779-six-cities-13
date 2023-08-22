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
					{description}
				</p>
			</div>
		</div>
	);
}

export default Host;
