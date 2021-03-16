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
		const formated = format.number(this.props.value, this.props.unit);
		return (
			<Typography type="Body1" style={this.getMandatoryStyle(formated.empty)}>
				{formated.value}
			</Typography>
		);
	}
}
