import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { SiteStore } from '../../stores';
import { LoginForm } from './components/LoginForm';

const Panel = styled.div`
	width: 500px;
	margin: 200px auto;
	background: #fff;
	padding: 20px;
	box-shadow: 0 7px 30px rgba(0, 0, 0, 0.1);

	h1 {
		font-size: 1rem;
		text-align: center;
	}
`;

export interface ILoginPanelProps {
	store: typeof SiteStore.Type;
}

@inject('store')
@observer
export class LoginPanel extends React.Component {
	private get inject() {
		return this.props as ILoginPanelProps;
	}
	public render() {
		return (
			<Panel>
				<h1>Config Stone</h1>
				<LoginForm handleSubmit={this.onLoginSubmit} />
			</Panel>
		);
	}

	private onLoginSubmit = data => {
		const { session } = this.inject.store;
		session.login(data.email, data.password);
	};
}
