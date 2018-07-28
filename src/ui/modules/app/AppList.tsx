import { Button, Form, Input, Modal, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import { ContentLayout } from 'modules/layout/components/ContentLayout';
import { ContentPanel } from 'modules/layout/components/Panel';
import * as React from 'react';
import { SiteStore } from 'stores';
import { AppList as List } from './components/AppList';
import { AppCreateForm } from './components/CreateForm';

export interface IAppListProps {
	store: typeof SiteStore.Type;
}

@inject('store')
@observer
export class AppList extends React.Component<IAppListProps> {
	public state = {
		projectModal: false,
	};

	public componentDidMount() {
		this.props.store.apps.fetch();
	}

	public render() {
		const { store } = this.props;
		return (
			<ContentLayout>
				<ContentPanel>
					<h2>App list</h2>
					{store.apps.loading ? (
						<Spin />
					) : (
						<List items={store.apps.list} />
					)}
					<Button onClick={this.toggleProjectModal}>
						New Project
					</Button>
					<Modal
						title="Create New Project"
						visible={this.state.projectModal}
						onCancel={this.toggleProjectModal}
						footer={null}
					>
						<AppCreateForm handleSumbit={this.createProject} />
					</Modal>
				</ContentPanel>
			</ContentLayout>
		);
	}

	private toggleProjectModal = () => {
		this.setState({ projectModal: !this.state.projectModal });
	};

	private createProject = (data, form) => {
		const { store } = this.props;
		store.apps.create(data).then(() => {
			this.toggleProjectModal();
			form.resetFields();
			store.apps.fetch();
		});
	};
}
