import React from "react";
import { Input } from "../..";
import format from "../../../utils/format";
import { IInputNumber } from "../../input/components/number";
import Typography from "../../typography";
import EditableBase from "./base";

/**
 * Cislo
 */
export default class EditableNumber extends EditableBase<IInputNumber> {
	/**
	 * Vykreslit pole
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Number {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}

	/**
	 * Vykreslit hodnotu
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderValue(): JSX.Element {
		const { value, unit } = this.props;
		return <Typography type="Body1">{format.number(value, unit)}</Typography>;
	}
}
