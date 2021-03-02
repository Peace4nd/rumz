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
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Picker {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}
	protected renderValue(): JSX.Element {
		const { field, value } = this.props;
		return <Typography type="Body1">{format.item(value, field.items)}</Typography>;
	}
}
