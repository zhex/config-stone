import { List } from 'antd';
import * as React from 'react';

const renderApp = item => <List.Item>{item.name}</List.Item>;

export const AppList: React.SFC<any> = ({ items }) => (
	<List dataSource={items} renderItem={renderApp} />
);

AppList.displayName = 'AppList';
