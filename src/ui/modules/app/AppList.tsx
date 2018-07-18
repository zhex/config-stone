import * as React from 'react';
import { connect } from 'react-redux';
import { AppList as List } from './components/AppList';

class AppList extends React.PureComponent {
	public render() {
		return (
			<div>
				<h3>app list</h3>
				<List />
			</div>
		);
	}
}

export const AppListContainer = connect()(AppList);
