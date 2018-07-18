import { Menu } from 'antd';
import * as React from 'react';

const { Item } = Menu;

export const MainMenu: React.SFC = () => (
	<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
		<Item key="1">Application</Item>
		<Item key="2">Setting</Item>
	</Menu>
);

MainMenu.displayName = 'MainMenu';
