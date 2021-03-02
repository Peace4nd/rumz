import React from "react";
import { Input } from "../..";
import format from "../../../utils/format";
import { IInputText } from "../../input/components/text";
import Typography from "../../typography";
import EditableBase from "./base";

/**
 * Text
 */
export default class EditableNumber extends EditableBase<IInputText> {
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Text {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}
	protected renderValue(): JSX.Element {
		const { value } = this.props;
		return <Typography type="Body1">{format.string(value)}</Typography>;
	}
}
