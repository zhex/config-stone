import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Item } from 'stores/item';

const InputBox = observer(Input);

export interface ICreateFormProps extends FormComponentProps {
	item?: typeof Item.Type;
	items: ReadonlyArray<typeof Item.Type>;
	handleSumbit?: (data, form?) => void;
}

class InnerForm extends React.Component<ICreateFormProps> {
	public render() {
		const { form } = this.props;
		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Item label="Key">
					{form.getFieldDecorator('key', {
						rules: [
							{ required: true, message: 'Key is required' },
							{ validator: this.keyExistValidator },
						],
					})(<InputBox />)}
				</Form.Item>

				<Form.Item label="Value">
					{form.getFieldDecorator('value', {
						rules: [
							{ required: true, message: 'Value is required' },
						],
					})(<InputBox />)}
				</Form.Item>

				<Form.Item label="Comment">
					{form.getFieldDecorator('comment')(<InputBox.TextArea />)}
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
			if (!err && typeof handleSumbit === 'function') {
				handleSumbit(values, form);
			}
		});
	};

	private keyExistValidator = (rule, value, callback) => {
		const { items, item } = this.props;
		const idx = items.map(i => i.key).indexOf(value);
		if ( idx >= 0  ) {
			if (item) {
				if (item.id !== items[idx].id) {
					callback('Key is already exist');
				}
			} else {
				callback('Key is already exist');
			}
		}
		callback();
	};
}

export const ItemForm = Form.create({
	mapPropsToFields(props: ICreateFormProps) {
		return  props.item ? {
			key: Form.createFormField({ value: props.item.key }),
			value: Form.createFormField({ value: props.item.value }),
			comment: Form.createFormField({ value: props.item.comment }),
		} : {};
	}
})(observer(InnerForm));
