import { observer } from 'mobx-react';
import styled from 'styled-components';

export const Panel = observer(styled.div`
	background: #fff;
	margin-bottom: 16px;
`);

export const ContentPanel = Panel.extend`
	padding: 20px;
`;
