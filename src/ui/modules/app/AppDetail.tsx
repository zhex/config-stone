import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AppDetail extends React.PureComponent {
	public render() {
		return (
			<Layout.Content style={{ padding: '20px 50px' }}>
				<Link to="/">&lt; Back</Link>
				<div
					style={{
						background: 'white',
						padding: 20,
						maxWidth: 1000,
						margin: '0 auto',
					}}
				>
					<h2>App Detail</h2>
				</div>
			</Layout.Content>
		);
	}
}

export const AppDetailContainer = connect()(AppDetail);
