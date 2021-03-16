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
	/**
	 * Vykreslit pole
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Date {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}

	/**
	 * Vykreslit hodnotu
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderValue(): JSX.Element {
		const formated = format.date(this.props.value);
		return (
			<Typography type="Body1" style={this.getMandatoryStyle(formated.empty)}>
				{formated.value}
			</Typography>
		);
	}
}
