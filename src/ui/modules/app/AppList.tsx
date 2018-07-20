import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux/actions';
import * as sel from 'redux/selectors';
import { AppList as List } from './components/AppList';

export interface IAppListProps {
	apps: any[];
	loading: boolean;
	onLoad(): void;
}

class AppList extends React.PureComponent<IAppListProps> {
	public componentDidMount() {
		this.props.onLoad();
	}

	public render() {
		const { apps, loading } = this.props;
		return (
			<Layout.Content style={{ padding: '20px 50px' }}>
				<div
					style={{
						background: 'white',
						padding: 20,
						maxWidth: 1000,
						margin: '0 auto',
					}}
				>
					<h2>App list</h2>
					<List items={apps} loading={loading} />
				</div>
			</Layout.Content>
		);
	}
}

const mapStates = state => ({
	apps: sel.appList(state),
	loading: sel.appLoading(state),
});

const mapActions = dispatch => ({
	onLoad() {
		dispatch(actions.apps.fetchStart());
	},
});

export const AppListContainer = connect(
	mapStates,
	mapActions,
)(AppList);
