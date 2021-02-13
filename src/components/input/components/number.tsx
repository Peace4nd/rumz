import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { IInput, IInputCore } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputNumberState {
	value: number;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export type IInputNumber = IInput<number, TextInputProps>;

/**
 * Ciselny vstup
 */
export default class InputNumber extends React.PureComponent<IInputNumber, IInputNumberState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputNumberState = {
		error: null,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputNumber = {
		highlight: false,
		icon: null,
		onChange: null,
		placeholder: null,
		validator: null,
		value: 0
	};

	/**
	 * Reference
	 */
	private ref: React.RefObject<TextInput> = React.createRef();

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { field, highlight, icon, placeholder } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null, error ? styles.wrapperError : null]}>
				<Icon style={styles.iconBasic} icon={icon} color={Color.Dark} />
				<TextInput
					{...field}
					ref={this.ref}
					style={styles.fieldBasic}
					value={value ? String(value) : ""}
					placeholder={placeholder}
					placeholderTextColor={Color.Muted}
					keyboardType="numeric"
					onChangeText={this.handleChange}
				/>
				{error && (
					<Typography type="Subtitle2" style={styles.error}>
						{error}
					</Typography>
				)}
			</View>
		);
	}

	/**
	 * Zamereni
	 */
	public focus(): void {
		this.ref.current.focus();
	}

	/**
	 * Zmenova udalost
	 *
	 * @param {string} value Hodnota
	 */
	private handleChange = (value: string): void => {
		// rozlozeni props
		const { validator } = this.props;
		// parsovani hodnoty
		const parsed = parseInt(value, 10) || 0;
		// aktualizace
		this.setState(
			{
				error: validator ? validator(parsed) : null,
				value: parsed
			},
			() => {
				this.props.onChange(parsed, { filled: parsed > 0, valid: this.state.error === null });
			}
		);
	};
}
