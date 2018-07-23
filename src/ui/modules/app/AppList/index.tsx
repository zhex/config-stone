import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { SiteStore } from 'stores';
import { AppList as List } from '../components/AppList';
import * as styles from './style.css';

export interface IAppListProps {
	store: typeof SiteStore.Type;
}

@inject('store')
@observer
export default class AppList extends React.Component<IAppListProps> {
	public componentDidMount() {
		this.props.store.apps.fetch();
	}

	public render() {
		const { store } = this.props;
		return (
			<Layout.Content className={styles.layout}>
				<div className={styles.inner}>
					<h2>App list</h2>
					<List
						items={store.apps.list}
						loading={store.apps.loading}
					/>
				</div>
			</Layout.Content>
		);
	}
}
