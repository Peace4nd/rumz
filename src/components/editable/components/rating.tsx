import React from "react";
import { Rating } from "../..";
import { IInputRating } from "../../input/components/rating";
import EditableBase from "./base";

/**
 * Hodnoceni
 */
export default class EditableNumber extends EditableBase<IInputRating> {
	/**
	 * Vykreslit pole
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderField(): JSX.Element {
		const { value } = this.props;
		return <Rating value={value} onChange={this.handleChange} />;
	}

	/**
	 * Vykreslit hodnotu
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderValue(): JSX.Element {
		return <Rating value={this.props.value} />;
	}
}
