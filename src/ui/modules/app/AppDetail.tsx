import * as React from 'react';
import { connect } from 'react-redux';

class Detail extends React.PureComponent {
	public render() {
		return (
			<div>app detail</div>
		);
	}
}

export const AppDetail = connect()(Detail);
