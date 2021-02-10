import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { IInput } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputTextState {
	value: string;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export type IInputText = IInput<string, TextInputProps>;

/**
 * Textovy vstup
 */
export default class InputText extends React.PureComponent<IInputText, IInputTextState> {
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
		highlight: false,
		icon: null,
		onChange: null,
		placeholder: null,
		validator: null,
		value: ""
	};

	/**
	 * Aktualizace komponenty
	 *
	 * @param {IInputText} prevProps Predchozi vlastnosti
	 */
	public componentDidUpdate(prevProps: IInputText): void {
		if (this.props.value !== prevProps.value) {
			this.handleChange(this.props.value);
		}
	}

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
					style={styles.fieldBasic}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={Color.Muted}
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
		this.setState(
			{
				error: validator ? validator(value) : null,
				value
			},
			() => {
				this.props.onChange(this.state.value, { filled: this.state.value !== "", valid: this.state.error === null });
			}
		);
	};
}
