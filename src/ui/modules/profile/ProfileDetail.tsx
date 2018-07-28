import { Button, Dropdown, Menu, Modal, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { ContentPanel } from 'modules/layout/components/Panel';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SiteStore } from 'stores';
import { Filter } from './components/Filter';
import { ItemCreateForm } from './components/ItemCreateForm';
import { ViewSwitch } from './components/ViewSwitch';

export interface IProfileDetailProps extends RouteComponentProps<any> {
	store: typeof SiteStore.Type;
}

const menu = (
	<Menu>
		<Menu.Item key="1">History</Menu.Item>
		<Menu.Item key="2">Import</Menu.Item>
		<Menu.Item key="3">Download</Menu.Item>
		<Menu.Item key="4">Delete Profile</Menu.Item>
	</Menu>
);

@inject('store')
@observer
export class ProfileDetail extends React.Component<IProfileDetailProps, any> {
	public state = {
		itemModal: false,
	};

	private cols = [
		{ title: 'Key', dataIndex: 'key' },
		{ title: 'Value', dataIndex: 'value' },
		{ title: 'Comment', dataIndex: 'comment' },
		{
			title: 'Actions',
			render: (text, record) => (
				<div>
					<Button icon="edit" size="small" shape="circle" />
					<Button
						icon="close"
						size="small"
						shape="circle"
						onClick={this.deleteItem.bind(null, record)}
					/>
				</div>
			),
		},
	];

	public get profile() {
		const { store, match } = this.props;
		return store.profiles.get(match.params.profileId);
	}

	public componentDidMount() {
		const { store, match } = this.props;
		const { appId, profileId } = match.params;
		store.items.fetch(appId, profileId);
	}

	public componentWillReceiveProps(nextProps) {
		const { store, match } = nextProps;
		const { appId, profileId } = match.params;
		if (profileId !== this.props.match.params.profileId) {
			store.items.fetch(appId, profileId);
		}
	}

	public render() {
		const { store } = this.props;

		return this.profile ? (
			<ContentPanel>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: 15,
					}}
				>
					<h2>
						{this.profile.name}{' '}
						<span style={{ color: 'grey' }}>
							(key: {this.profile.key})
						</span>
					</h2>
					<Button.Group>
						<Button icon="play-circle-o">Release</Button>
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
						<ViewSwitch />
					</div>
					<div>
						<Filter />
					</div>

					<div>
						<Button
							shape="circle"
							type="primary"
							icon="plus"
							onClick={this.toggleItemModal}
						/>
						<Modal
							title="Create New Item"
							visible={this.state.itemModal}
							onCancel={this.toggleItemModal}
							footer={null}
						>
							<ItemCreateForm handleSumbit={this.createItem} />
						</Modal>
					</div>
				</div>

				<Table
					columns={this.cols}
					dataSource={store.items.list as any}
					bordered
					pagination={false}
				/>
			</ContentPanel>
		) : null;
	}

	private toggleItemModal = () => {
		this.setState({ itemModal: !this.state.itemModal });
	};

	private createItem = (data, form) => {
		const { store, match } = this.props;
		const app = store.apps.get(match.params.appId);
		store.items.create(app.id, this.profile.id, data).then(() => {
			this.toggleItemModal();
			form.resetFields();
			store.items.fetch(app.id, this.profile.id);
		});
	};

	private deleteItem = (item) => {
		const { store, match } = this.props;
		const app = store.apps.get(match.params.appId);
		store.items.delete(app.id, this.profile.id, item.id);
	};
}
