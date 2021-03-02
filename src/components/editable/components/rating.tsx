import React from "react";
import { Rating } from "../..";
import { IInputRating } from "../../input/components/rating";
import EditableBase from "./base";

/**
 * Hodnoceni
 */
export default class EditableNumber extends EditableBase<IInputRating> {
	protected renderField(): JSX.Element {
		return null;
	}
	protected renderValue(): JSX.Element {
		const { value } = this.props;
		return <Rating value={value} onChange={this.handleSave} />;
	}
}
