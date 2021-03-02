import React from "react";
import { Input } from "../..";
import format from "../../../utils/format";
import { IInputDate } from "../../input/components/date";
import Typography from "../../typography";
import EditableBase from "./base";

/**
 * Datum
 */
export default class EditableDate extends EditableBase<IInputDate> {
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Date {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}
	protected renderValue(): JSX.Element {
		const { value } = this.props;
		return <Typography type="Body1">{format.date(value)}</Typography>;
	}
}