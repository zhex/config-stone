import { Layout } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

const Inner = styled.div`
	display: block;
	max-width: 1000px;
	margin: 0 auto;
`;

export const ContentLayout = observer(({ children }) => (
	<Layout.Content>
		<Inner>{children}</Inner>
	</Layout.Content>
));
