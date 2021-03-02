import React from "react";
import { Input } from "../..";
import format from "../../../utils/format";
import { IInputMultiline } from "../../input/components/multiline";
import Typography from "../../typography";
import EditableBase from "./base";

/**
 * Viceradkovy text
 */
export default class EditableDate extends EditableBase<IInputMultiline> {
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Multiline {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}
	protected renderValue(): JSX.Element {
		const { value } = this.props;
		return <Typography type="Body1">{format.string(value)}</Typography>;
	}
}
