import * as React from 'react';
import { connect } from 'react-redux';

class List extends React.PureComponent {
	public render() {
		return (
			<div>app list</div>
		);
	}
}

export const AppList = connect()(List);
