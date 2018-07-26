import { Button, Dropdown, Icon, Input, Menu, Radio } from 'antd';
import { inject, observer } from 'mobx-react';
import { ContentPanel } from 'modules/layout/components/Panel';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SiteStore } from 'stores';
import { ItemTable } from './components/ItemTable';
import { ViewSwitch } from './components/ViewSwitch';

export interface IProfileDetailProps extends RouteComponentProps<any> {
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
export class ProfileDetail extends React.Component<IProfileDetailProps> {
	private get inject() {
		return this.props as IProfileDetailProps;
	}

	public componentDidMount() {
		const { store, match } = this.inject;
		const { appId, profileId } = match.params;
		store.items.fetch(appId, profileId);
	}

	public render() {
		const { store } = this.inject;

		return (
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
						<span style={{ color: 'grey' }}>(key: default)</span>
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
						<ViewSwitch />
					</div>
					<div>
						<Input.Search placeholder="Filter ..." />
					</div>

					<div>
						<Button shape="circle" type="primary" icon="plus" />
					</div>
				</div>

				<ItemTable data={store.items.list} />
			</ContentPanel>
		);
	}
}
