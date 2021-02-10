/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { ScrollView, ViewBase } from "react-native";
import Input, { IInputState } from "../input";
import { IInputDate } from "../input/components/date";
import { IInputImage } from "../input/components/image";
import { IInputMultiline } from "../input/components/multiline";
import { IInputNumber } from "../input/components/number";
import { IInputPicker } from "../input/components/picker";
import { IInputRating } from "../input/components/rating";
import { IInputText } from "../input/components/text";
import styles from "./styles";

type IFormState = Record<string, { value: unknown; state: IInputState }>;

export interface IFormFieldShared {
	name: string;
}

export interface IFormFieldDate extends IFormFieldShared, Omit<IInputDate, "onChange"> {
	type: "date";
}

export interface IFormFieldImage extends IFormFieldShared, Omit<IInputImage, "onChange"> {
	type: "image";
}

export interface IFormFieldMultiline extends IFormFieldShared, Omit<IInputMultiline, "onChange"> {
	type: "multiline";
}

export interface IFormFieldNumber extends IFormFieldShared, Omit<IInputNumber, "onChange"> {
	type: "number";
}

export interface IFormFieldPicker extends IFormFieldShared, Omit<IInputPicker, "onChange"> {
	type: "picker";
}

export interface IFormFieldRating extends IFormFieldShared, Omit<IInputRating, "onChange"> {
	type: "rating";
}

export interface IFormFieldText extends IFormFieldShared, Omit<IInputText, "onChange"> {
	type: "text";
}

export type IFormField = IFormFieldDate | IFormFieldImage | IFormFieldMultiline | IFormFieldNumber | IFormFieldPicker | IFormFieldRating | IFormFieldText;

export interface IForm {
	fields: IFormField[];
	onChange: () => void;
}

/**
 * Formular
 *
 * @returns {JSX.Element} Element
 */
export default class Form extends React.PureComponent<IForm, IFormState> {
	/**
	 * Vychozi stav
	 */
	public state: IFormState = {};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { fields } = this.props;
		// sestaveni a vraceni
		return (
			<ScrollView keyboardDismissMode="on-drag" style={styles.wrapper}>
				{fields.map((field, index) => (
					<React.Fragment key={index}>
						{index > 0 && <ViewBase style={styles.rowGap} />}
						{this.renderField(field)}
					</React.Fragment>
				))}
			</ScrollView>
		);
	}

	private renderField(field: IFormField): JSX.Element {
		// rozlozeni props
		const { name, type, ...rest } = field;
		// sestaveni
		switch (type) {
			case "date":
				return <Input.Date {...(rest as IInputDate)} onChange={this.handleChange.bind(this, name)} />;
			case "image":
				return <Input.Image {...(rest as IInputImage)} onChange={this.handleChange.bind(this, name)} />;
			case "multiline":
				return <Input.Multiline {...(rest as IInputMultiline)} onChange={this.handleChange.bind(this, name)} />;
			case "number":
				return <Input.Number {...(rest as IInputNumber)} onChange={this.handleChange.bind(this, name)} />;
			case "picker":
				return <Input.Picker {...(rest as IInputPicker)} onChange={this.handleChange.bind(this, name)} />;
			case "rating":
				return <Input.Rating {...(rest as IInputRating)} onChange={this.handleChange.bind(this, name)} />;
			case "text":
				return <Input.Text {...(rest as IInputText)} onChange={this.handleChange.bind(this, name)} />;
		}

		/*
		field: {
									onSubmitEditing: () => console.log("koko"),
									returnKeyType: "next"
								}
		*/
	}

	private handleChange(name: string, value: unknown, state: IInputState): void {
		this.setState(
			{
				[name]: {
					state,
					value
				}
			},
			() => {
				console.log(this.state);

				this.props.onChange();
			}
		);
	}
}
