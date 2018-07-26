import { Col, List, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Link, RouteComponentProps } from 'react-router-dom';
import { SiteStore } from 'stores';
import { ContentLayout } from '../layout/components/ContentLayout';
import { ContentPanel, Panel } from '../layout/components/Panel';

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
		store.profiles.fetch(match.params.appId);
	}

	public render() {
		const { store, route } = this.props;
		return (
			<ContentLayout>
				<BackLink to="/">&lt; Back</BackLink>

				<Row gutter={20}>
					<Col span={6}>
						{this.app && (
							<ContentPanel>
								<h2>{this.app.name}</h2>
								<div>{this.app.key}</div>
							</ContentPanel>
						)}

						<Panel>
							<List
								dataSource={store.profiles.list}
								header={
									<div style={{ padding: '0 20px' }}>
										<strong>Profiles</strong>
									</div>
								}
								renderItem={item => (
									<List.Item style={{ padding: '10px 20px' }}>
										{item.name}
									</List.Item>
								)}
							/>
						</Panel>
					</Col>

					<Col span={18}>
						{renderRoutes(route.routes)}
					</Col>
				</Row>
			</ContentLayout>
		);
	}
}
