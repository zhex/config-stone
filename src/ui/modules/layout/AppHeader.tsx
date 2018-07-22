import { Col, Layout, Row } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';

const { Header } = Layout;

export const AppHeader: React.SFC = observer(() => (
	<Header>
		<Row>
			<Col span={12}>
				<span style={{ color: 'white' }}>Config Stone</span>
			</Col>
			<Col span={12}>Settings</Col>
		</Row>
	</Header>
));

AppHeader.displayName = 'AppHeader';
