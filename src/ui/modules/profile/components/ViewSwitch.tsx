import { Icon, Radio } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';

export const ViewSwitch = observer(() => (
	<Radio.Group value="1">
		<Radio.Button value="1">
			<Icon type="table" />
		</Radio.Button>
		<Radio.Button value="2">
			<Icon type="file-text" />
		</Radio.Button>
	</Radio.Group>
));
