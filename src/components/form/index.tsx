import React from "react";
import { ScrollView, View } from "react-native";
import Input, { IInputState } from "../input";
import { IInputDate } from "../input/components/date";
import { IInputImage } from "../input/components/image";
import { IInputMultiline } from "../input/components/multiline";
import { IInputNumber } from "../input/components/number";
import { IInputPicker } from "../input/components/picker";
import { IInputRange } from "../input/components/range";
import { IInputRating } from "../input/components/rating";
import { IInputText } from "../input/components/text";
import styles from "./styles";

type IFormState = Record<string, { value: unknown; state: IInputState }>;

export interface IFormFieldShared<V> {
	name: keyof V;
}

export interface IFormFieldDate<V> extends IFormFieldShared<V>, Omit<IInputDate, "onChange" | "value"> {
	type: "date";
}

export interface IFormFieldImage<V> extends IFormFieldShared<V>, Omit<IInputImage, "onChange" | "value"> {
	type: "image";
}

export interface IFormFieldMultiline<V> extends IFormFieldShared<V>, Omit<IInputMultiline, "onChange" | "value"> {
	type: "multiline";
}

export interface IFormFieldNumber<V> extends IFormFieldShared<V>, Omit<IInputNumber, "onChange" | "value"> {
	type: "number";
}

export interface IFormFieldPicker<V> extends IFormFieldShared<V>, Omit<IInputPicker, "onChange" | "value"> {
	type: "picker";
}

export interface IFormFieldRange<V> extends IFormFieldShared<V>, Omit<IInputRange, "onChange" | "value"> {
	type: "range";
}

export interface IFormFieldRating<V> extends IFormFieldShared<V>, Omit<IInputRating, "onChange" | "value"> {
	type: "rating";
}

export interface IFormFieldText<V> extends IFormFieldShared<V>, Omit<IInputText, "onChange" | "value"> {
	type: "text";
}

export type IFormField<V> =
	| IFormFieldDate<V>
	| IFormFieldImage<V>
	| IFormFieldMultiline<V>
	| IFormFieldNumber<V>
	| IFormFieldPicker<V>
	| IFormFieldRange<V>
	| IFormFieldRating<V>
	| IFormFieldText<V>;

export interface IForm<V> {
	fields: Array<IFormField<V>>;
	onChange: (values: V) => void;
	values?: V;
}

/**
 * Formular
 *
 * @returns {JSX.Element} Element
 */
export default class Form<V = unknown> extends React.PureComponent<IForm<V>, IFormState> {
	/**
	 * Vychozi stav
	 */
	public state: IFormState = {};

	private fields: any[] = [];

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
						{index > 0 && <View style={styles.rowGap} />}
						{this.renderField(field, index)}
					</React.Fragment>
				))}
			</ScrollView>
		);
	}

	private renderField(field: IFormField<V>, index: number): JSX.Element {
		// rozlozeni props
		const { name, type, ...rest } = field;
		// sestaveni
		switch (type) {
			case "date":
				return (
					<Input.Date
						{...(rest as IInputDate)}
						ref={(ref) => (this.fields[index] = ref)}
						onChange={(...input) => this.handleChange(name, ...input)}
					/>
				);
			case "image":
				return <Input.Image {...(rest as IInputImage)} onChange={(...input) => this.handleChange(name, ...input)} />;
			case "multiline":
				return <Input.Multiline {...(rest as IInputMultiline)} onChange={(...input) => this.handleChange(name, ...input)} />;
			case "number":
				return <Input.Number {...(rest as IInputNumber)} onChange={(...input) => this.handleChange(name, ...input)} />;
			case "picker":
				return <Input.Picker {...(rest as IInputPicker)} onChange={(...input) => this.handleChange(name, ...input)} />;
			case "rating":
				return <Input.Rating {...(rest as IInputRating)} onChange={(...input) => this.handleChange(name, ...input)} />;
			case "range":
				return <Input.Range {...(rest as IInputRange)} onChange={(...input) => this.handleChange(name, ...input)} />;
			case "text":
				return <Input.Text {...(rest as IInputText)} onChange={(...input) => this.handleChange(name, ...input)} />;
		}

		/*
		field: {
									onSubmitEditing: () => console.log("koko"),
									returnKeyType: "next"
								}
		*/
	}

	private handleChange(name: keyof V, value: unknown, state: IInputState): void {
		this.setState(
			{
				[name]: {
					state,
					value
				}
			},
			() => {
				console.log(this.state);

				this.props.onChange(null); // tady bude premapovany vystup
			}
		);
	}
}
