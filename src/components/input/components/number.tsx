import React from "react";
import { TextInput, View } from "react-native";
import { IInput } from "..";
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
export type IInputNumber = IInput<number>;

/**
 * Ciselny vstup
 */
export default class InputNumber extends React.PureComponent<IInputNumber, IInputNumberState> {
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
		value: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { highlight, icon, placeholder } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null, error ? styles.wrapperError : null]}>
				<Icon style={styles.iconBasic} icon={icon} color={Color.Dark} />
				<TextInput
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
	 * Zmenova udalost
	 *
	 * @param {string} value Hodnota
	 */
	private handleChange = (value: string): void => {
		// rozlozeni props
		const { validator } = this.props;
		// parsovani hodnoty
		const parsed = parseInt(value, 10);
		// aktualizace
		this.setState(
			{
				error: validator ? validator(parsed) : null,
				value: parsed
			},
			() => {
				this.props.onChange(parsed, { filled: parsed !== null, valid: this.state.error === null });
			}
		);
	};
}
