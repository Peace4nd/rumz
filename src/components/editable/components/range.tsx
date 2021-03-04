import React from "react";
import { Input } from "../..";
import format from "../../../utils/format";
import { IInputRange } from "../../input/components/range";
import Typography from "../../typography";
import EditableBase from "./base";

/**
 * Rozsah
 */
export default class EditableRange extends EditableBase<IInputRange> {
	/**
	 * Vykreslit pole
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderField(): JSX.Element {
		const { field, placeholder, value } = this.props;
		return <Input.Range {...field} placeholder={placeholder} value={value} onChange={this.handleChange} />;
	}

	/**
	 * Vykreslit hodnotu
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderValue(): JSX.Element {
		const { value, unit } = this.props;
		return <Typography type="Body1">{format.range(value, unit)}</Typography>;
	}
}
