import { Icon } from 'antd';
import { observer } from 'mobx-react';
import { ContentPanel } from 'modules/layout/components/Panel';
import * as React from 'react';

export const AppPanel = observer(({ app }) => (
	<ContentPanel>
		<h2>

			{app.name}
		</h2>
		<div>{app.key}</div>
	</ContentPanel>
));
