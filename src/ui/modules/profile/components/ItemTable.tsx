import { Button, Table } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';

const cols = [
	{ title: 'Key', dataIndex: 'key' },
	{ title: 'Value', dataIndex: 'value' },
	{ title: 'Comment', dataIndex: 'comment' },
	{ title: 'Actions', render: () => (
		<div>
			<Button icon="edit" size="small" shape="circle" />
			<Button icon="close" size="small" shape="circle" />
		</div>
	)},
];

export const ItemTable = observer(({ data }) => (
	<Table columns={cols} dataSource={data} bordered pagination={false} />
));
