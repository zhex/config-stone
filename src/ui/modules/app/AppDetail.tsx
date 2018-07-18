import * as React from 'react';
import { connect } from 'react-redux';

class AppDetail extends React.PureComponent {
	public render() {
		return (
			<div>app detail</div>
		);
	}
}

export const AppDetailContainer = connect()(AppDetail);
