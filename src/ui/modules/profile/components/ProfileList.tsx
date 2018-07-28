import { Icon, List } from 'antd';
import { observer } from 'mobx-react';
import { Panel } from 'modules/layout/components/Panel';
import * as React from 'react';
import { Link } from 'react-router-dom';

const ListItem = item => (
	<List.Item style={{ padding: '10px 20px' }}>
		<Link to={`/apps/${item.appId}/profiles/${item.id}`}>{item.name}</Link>
	</List.Item>
);

const Header = observer(() => (
	<div
		style={{
			padding: '0 20px',
			display: 'flex',
			justifyContent: 'space-between',
		}}
	>
		<div>
			<strong>Profiles</strong>
		</div>
		<div>
			<Icon type="plus" />
		</div>
	</div>
));

export const ProfileList = observer(({ list }) => (
	<Panel>
		<List dataSource={list} header={<Header />} renderItem={ListItem} />
	</Panel>
));
