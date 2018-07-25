import {
	Button,
	Col,
	Dropdown,
	Icon,
	Input,
	List,
	Menu,
	Radio,
	Row,
	Table,
} from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { SiteStore } from 'stores';
import { ContentLayout } from '../layout/components/ContentLayout';
import { ContentPanel, Panel } from '../layout/components/Panel';

const BackLink = observer(Link);

export interface IAppDetailProps extends RouteComponentProps<any> {
	store: typeof SiteStore.Type;
}

const menu = (
	<Menu>
		<Menu.Item key="1">History</Menu.Item>
		<Menu.Item key="1">Import</Menu.Item>
		<Menu.Item key="1">Download</Menu.Item>
		<Menu.Item key="2">Delete Profile</Menu.Item>
	</Menu>
);

@inject('store')
@observer
export class AppDetail extends React.Component<IAppDetailProps> {
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
						<ContentPanel>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: 15,
								}}
							>
								<h2>
									Default{' '}
									<span style={{ color: 'grey' }}>
										(key: default)
									</span>
								</h2>
								<Button.Group>
									<Button>Release</Button>
									<Button icon="rollback">Revert</Button>
									<Button>Gray</Button>
									<Dropdown overlay={menu}>
										<Button icon="ellipsis" />
									</Dropdown>
								</Button.Group>
							</div>

							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: 15,
								}}
							>
								<div>
									<Radio.Group buttonStyle="solid" value="1">
										<Radio.Button value="1">
											<Icon type="table" />
										</Radio.Button>
										<Radio.Button value="2">
											<Icon type="file-text" />
										</Radio.Button>
									</Radio.Group>
								</div>
								<div>
									<Input.Search placeholder="Filter ..." />
								</div>

								<div>
									<Button
										shape="circle"
										type="primary"
										icon="plus"
									/>
								</div>
							</div>

							<Table
								columns={[
									{ title: 'Key', dataIndex: 'key' },
									{ title: 'Value', dataIndex: 'value' },
									{ title: 'Comment', dataIndex: 'comment' },
									{ title: 'Actions' },
								]}
								dataSource={[
									{
										key: 'mysql.port',
										value: '3000',
										comment: 'mysql port',
									},
									{
										key: 'mysql.host',
										value: '11.20.30.4',
										comment: 'mysql host name',
									},
									{
										key: 'mysql.username',
										value: 'root',
										comment: 'mysql username',
									},
									{
										key: 'mysql.password',
										value: 'root',
										comment: 'mysql password',
									},
								]}
								bordered
								pagination={false}
							/>
						</ContentPanel>
					</Col>
				</Row>
			</ContentLayout>
		);
	}
}
