import { Icon, List, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { Panel } from 'modules/layout/components/Panel';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { SiteStore } from 'stores';
import { ProfileCreateForm } from './components/ProfileCreateForm';

const Header = observer(({ onAdd }) => (
	<div
		style={{
			padding: '0 20px',
			display: 'flex',
			justifyContent: 'space-between',
		}}
	>
		<div>
			<strong>Profiles</strong>
		</div>
		<div>
			<Icon type="plus" onClick={onAdd} />
		</div>
	</div>
));

export interface IProfileListProps extends RouteComponentProps<any> {
	store: typeof SiteStore.Type;
}

@inject('store')
@observer
class ProfileListInner extends React.Component<IProfileListProps> {
	public state = {
		profileModal: false,
	};

	public componentDidMount() {
		const { match, store } = this.props;
		store.profiles.fetch(match.params.appId);
	}

	public render() {
		const { store } = this.props;

		return (
			<Panel>
				<List
					dataSource={store.profiles.list}
					header={<Header onAdd={this.toggleProfileModal} />}
					renderItem={this.ListItem}
				/>
				<Modal
					title="Create New Profile"
					visible={this.state.profileModal}
					onCancel={this.toggleProfileModal}
					footer={null}
				>
					<ProfileCreateForm handleSumbit={this.createProfile} />
				</Modal>
			</Panel>
		);
	}

	private toggleProfileModal = () => {
		this.setState({ profileModal: !this.state.profileModal });
	};

	private ListItem = item => (
		<List.Item style={{ padding: '10px 20px' }}>
			<Link to={`/apps/${item.appId}/profiles/${item.id}`}>
				{item.name}
			</Link>
		</List.Item>
	);

	private createProfile = (data, form) => {
		const { store, match } = this.props;
		const app = store.apps.get(match.params.appId);
		store.profiles.create(app.id, data).then(() => {
			this.toggleProfileModal();
			form.resetFields();
			store.profiles.fetch(app.id);
		});
	};
}

export const ProfileList = withRouter<any>(ProfileListInner);
