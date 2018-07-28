import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer } from 'mobx-react';
import * as React from 'react';

const InputBox = observer(Input);

export interface ICreateFormProps extends FormComponentProps {
	handleSumbit?: (data, form?) => void;
}

class CreateForm extends React.Component<ICreateFormProps> {
	public render() {
		const { form } = this.props;
		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Item label="Profile Name">
					{form.getFieldDecorator('name', {
						rules: [
							{ required: true, message: 'Name is required' },
						],
					})(<InputBox />)}
				</Form.Item>

				<Form.Item label="Key">
					{form.getFieldDecorator('key', {
						rules: [{ required: true, message: 'Key is required' }],
					})(<InputBox />)}
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Create
					</Button>
				</Form.Item>
			</Form>
		);
	}

	private onSubmit = e => {
		e.preventDefault();
		const { form, handleSumbit } = this.props;
		form.validateFields((err, values) => {
			if (typeof handleSumbit === 'function') {
				handleSumbit(values, form);
			}
		});
	};
}

export const ProfileCreateForm = Form.create()(observer(CreateForm));
