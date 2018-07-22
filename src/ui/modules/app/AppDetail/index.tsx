import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

const BackLink = observer(Link);

export interface IAppDetailProps extends RouteComponentProps<any> {
	store: any;
}

@inject('store')
@observer
export default class AppDetail extends React.Component<IAppDetailProps> {
	public componentDidMount() {
		const { match, store } = this.props;
		store.apps.fetchById(match.params.id);
	}

	public render() {
		const { store, match } = this.props;
		const app = store.apps.get(match.params.id);
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
					<h2>{app && app.name}</h2>

					{/* {profiles.length && <div>{profiles[0].name}</div>} */}
				</div>
			</Layout.Content>
		);
	}
}
