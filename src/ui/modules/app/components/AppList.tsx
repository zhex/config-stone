import { List } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IAppListProps {
	items: any[];
	loading?: boolean;
}

const renderApp = item => (
	<List.Item>
		<Link to={`/apps/${item.id}`}>{item.name}</Link>
	</List.Item>
);

export const AppList: React.SFC<IAppListProps> = ({ items, loading }) => (
	<List grid={{gutter: 20, column: 6 }} dataSource={items} renderItem={renderApp} loading={loading} />
);

AppList.displayName = 'AppList';
