import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TextInput, View } from "react-native";
import { IInput } from "..";
import { Color, Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

interface IInputNumberState {
	value: string;
	parsed: number;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export type IInputNumber = IInput<number>;

/**
 * Ciselny vstup
 */
class InputNumber extends React.PureComponent<IInputNumber, IInputNumberState> {
	/**
	 * Vychozi stav
	 */
	public state: IInputNumberState = {
		error: null,
		parsed: 0,
		value: isFinite(this.props.value) ? "" : String(this.props.value)
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
				<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
				<TextInput
					style={styles.fieldBasic}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={Color.Primary.Muted}
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
		const parsed = parseFloat(value);
		// aktualizace
		this.setState(
			{
				error: validator ? validator(parsed) : null,
				parsed,
				value
			},
			() => {
				this.props.onChange(this.state.parsed, { filled: this.state.parsed !== null, valid: this.state.error === null });
			}
		);
	};
}

// export
export default InputNumber;
