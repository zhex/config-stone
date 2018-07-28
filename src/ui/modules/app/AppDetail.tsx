import { Col, Row, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import { ProfileList } from 'modules/profile/ProfileList';
import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Link, RouteComponentProps } from 'react-router-dom';
import { SiteStore } from 'stores';
import { ContentLayout } from '../layout/components/ContentLayout';
import { AppPanel } from './components/AppPanel';

const BackLink = observer(Link);

export interface IAppDetailProps extends RouteComponentProps<any> {
	store: typeof SiteStore.Type;
	route: RouteConfig;
}

@inject('store')
@observer
export class AppDetail extends React.Component<IAppDetailProps> {
	public get app() {
		const { store, match } = this.props;
		return store.apps.get(match.params.appId);
	}

	public componentDidMount() {
		const { match, store } = this.props;
		store.apps.fetchById(match.params.appId);
	}

	public render() {
		const { store, route, location } = this.props;
		return this.app ? (
			<ContentLayout>
				<BackLink to="/">&lt; Back</BackLink>
				{this.app && (
					<Row gutter={20}>
						<Col span={6}>
							<AppPanel app={this.app} />
							<ProfileList />
						</Col>

						<Col span={18}>
							{/* {location.pathname === `/apps/${this.app.id}` &&
								store.profiles.first && (
									<Redirect
										to={`/apps/${this.app.id}/profiles/${
											store.profiles.first.id
										}`}
									/>
								)} */}
							{renderRoutes(route.routes)}
						</Col>
					</Row>
				)}
			</ContentLayout>
		) : (
			<Spin />
		);
	}
}
