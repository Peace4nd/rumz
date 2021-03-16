import React from "react";
import { Input } from "../..";
import format from "../../../utils/format";
import { IInputPicker } from "../../input/components/picker";
import Typography from "../../typography";
import EditableBase from "./base";

/**
 * Vyber
 */
export default class EditablePicker extends EditableBase<IInputPicker> {
	/**
	 * Vykreslit pole
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Picker {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}

	/**
	 * Vykreslit hodnotu
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderValue(): JSX.Element {
		const formated = format.item(this.props.value, this.props.field.items);
		return (
			<Typography type="Body1" style={this.getMandatoryStyle(formated.empty)}>
				{formated.value}
			</Typography>
		);
	}
}
