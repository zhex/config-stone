import { Button, Dropdown, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { ContentPanel } from 'modules/layout/components/Panel';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SiteStore } from 'stores';
import { Filter } from './components/Filter';
import { ItemTable } from './components/ItemTable';
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
						<Button shape="circle" type="primary" icon="plus" />
					</div>
				</div>

				<ItemTable data={store.items.list} />
			</ContentPanel>
		) : null;
	}
}