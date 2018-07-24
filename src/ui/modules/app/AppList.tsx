import { Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import { ContentLayout } from 'modules/layout/components/ContentLayout';
import { ContentPanel } from 'modules/layout/components/Panel';
import * as React from 'react';
import { SiteStore } from 'stores';
import { AppList as List } from './components/AppList';

export interface IAppListProps {
	store: typeof SiteStore.Type;
}

@inject('store')
@observer
export class AppList extends React.Component<IAppListProps> {
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
				</ContentPanel>
			</ContentLayout>
		);
	}
}
