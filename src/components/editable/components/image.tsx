import { faImage } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Input } from "../..";
import Image from "../../image";
import { IInputImage } from "../../input/components/image";
import EditableBase from "./base";

/**
 * Obrazek
 */
export default class EditableImage extends EditableBase<IInputImage> {
	/**
	 * Vykreslit pole
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderField(): JSX.Element {
		const { field, label, value } = this.props;
		return <Input.Image {...field} icon={faImage} placeholder={label} value={value} onChange={this.handleChange} />;
	}

	/**
	 * Vykreslit hodnotu
	 *
	 * @returns {JSX.Element} Element
	 */
	protected renderValue(): JSX.Element {
		const { value } = this.props;
		return <Image source={value.path} />;
	}
}
