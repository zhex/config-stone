import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Item } from 'stores/item';

const InputBox = observer(Input);

export interface IReleaseFormProps extends FormComponentProps {
	handleSumbit?: (data, form?) => void;
}

class ReleaseFormComponent extends React.Component<IReleaseFormProps> {
	public componentDidMount() {
		const { form } = this.props;
		form.setFieldsValue({ name: `Release-${Date.now()}` });
	}
	public render() {
		const { form } = this.props;
		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Item label="Name">
					{form.getFieldDecorator('name', {
						rules: [
							{ required: true, message: 'Name is required' },
						],
					})(<InputBox />)}
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Release
					</Button>
				</Form.Item>
			</Form>
		);
	}

	private onSubmit = e => {
		e.preventDefault();
		const { form, handleSumbit } = this.props;
		form.validateFields((err, values) => {
			if (!err && typeof handleSumbit === 'function') {
				handleSumbit(values, form);
			}
		});
	};
}

export const ReleaseForm = Form.create()(observer(ReleaseFormComponent));
