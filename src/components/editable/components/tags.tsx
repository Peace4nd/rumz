import React from "react";
import { Input } from "../..";
import format from "../../../utils/format";
import { IInputTags } from "../../input/components/tags";
import Typography from "../../typography";
import EditableBase from "./base";

/**
 * Tagy
 */
export default class EditableTags extends EditableBase<IInputTags> {
	/**
	 * Vykreslit pole
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Tags {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}

	/**
	 * Vykreslit hodnotu
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderValue(): JSX.Element {
		const formated = format.array(this.props.value);
		return (
			<Typography type="Body1" style={this.getMandatoryStyle(formated.empty)}>
				{formated.value}
			</Typography>
		);
	}
}
