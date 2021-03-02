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
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Tags {...field} placeholder={label} value={value} onChange={this.handleChange} />;
	}
	protected renderValue(): JSX.Element {
		const { value } = this.props;
		return <Typography type="Body1">{format.array(value)}</Typography>;
	}
}
