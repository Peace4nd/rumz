import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TextInput, View } from "react-native";
import { IInput } from "..";
import { Color, Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

interface IInputTextState {
	value: string;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export type IInputText = IInput<string>;

/**
 * Textovy vstup
 */
class InputText extends React.Component<IInputText, IInputTextState> {
	/**
	 * Vychozi stav
	 */
	public state: IInputTextState = {
		error: null,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputText = {
		icon: null,
		onChange: null,
		placeholder: null,
		validator: null,
		value: ""
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, placeholder } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, error ? styles.wrapperError : null]}>
				<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
				<TextInput
					style={styles.fieldBasic}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={Color.Primary.Muted}
					onEndEditing={this.handleDone}
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
		// aktualizace
		this.setState({
			error: validator ? validator(value) : null,
			value
		});
	};

	/**
	 * Dokonceni editace
	 */
	private handleDone = (): void => {
		this.props.onChange(this.state.value, !!this.state.error);
	};
}

// export
export default InputText;
