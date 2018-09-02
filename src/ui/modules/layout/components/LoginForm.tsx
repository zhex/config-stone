import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer } from 'mobx-react';
import * as React from 'react';

const InputBox = observer(Input);

export interface ICreateFormProps extends FormComponentProps {
	handleSubmit?: (data, form?) => void;
}

class InnerForm extends React.Component<ICreateFormProps> {
	public render() {
		const { form } = this.props;
		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Item label="Email">
					{form.getFieldDecorator('email', {
						rules: [
							{ required: true, message: 'Email is required' },
						],
					})(<InputBox />)}
				</Form.Item>

				<Form.Item label="Password">
					{form.getFieldDecorator('password', {
						rules: [
							{ required: true, message: 'Password is required' },
						],
					})(<InputBox type="password" />)}
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						login
					</Button>
				</Form.Item>
			</Form>
		);
	}

	private onSubmit = e => {
		e.preventDefault();
		const { form, handleSubmit } = this.props;
		form.validateFields((err, values) => {
			if (!err && typeof handleSubmit === 'function') {
				handleSubmit(values, form);
			}
		});
	};
}

export const LoginForm = Form.create()(observer(InnerForm));
