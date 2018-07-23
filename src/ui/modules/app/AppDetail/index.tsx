import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { SiteStore } from 'stores';

const BackLink = observer(Link);

export interface IAppDetailProps extends RouteComponentProps<any> {
	store: typeof SiteStore.Type;
}

@inject('store')
@observer
export default class AppDetail extends React.Component<IAppDetailProps> {

	public get app() {
		const { store, match } = this.props;
		return store.apps.get(match.params.id);
	}

	public componentDidMount() {
		const { match, store } = this.props;
		store.apps.fetchById(match.params.id);
		store.profiles.fetch(match.params.id);
	}

	public render() {
		const { store } = this.props;
		return (
			<Layout.Content style={{ padding: '20px 50px' }}>
				<BackLink to="/">&lt; Back</BackLink>
				<div
					style={{
						background: 'white',
						padding: 20,
						maxWidth: 1000,
						margin: '0 auto',
					}}
				>
					<h2>{this.app && this.app.name}</h2>

					{store.profiles.list.map(p => (
						<div key={p.id}>{p.name}</div>
					))}
				</div>

			</Layout.Content>
		);
	}
}
