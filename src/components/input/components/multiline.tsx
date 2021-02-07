import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TextInput, View } from "react-native";
import { IInput } from "..";
import { Color, Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

interface IInputMultilineState {
	value: string;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputMultiline extends IInput<string> {
	lines: number;
}

/**
 * Viceradkovy textovy vstup
 */
export default class InputMultiline extends React.PureComponent<IInputMultiline, IInputMultilineState> {
	/**
	 * Vychozi stav
	 */
	public state: IInputMultilineState = {
		error: null,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputMultiline = {
		highlight: false,
		icon: null,
		lines: 5,
		onChange: null,
		placeholder: null,
		validator: null,
		value: ""
	};

	/**
	 * Aktualizace komponenty
	 *
	 * @param {IInputMultiline} prevProps Predchozi vlastnosti
	 */
	public componentDidUpdate(prevProps: IInputMultiline): void {
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
		const { highlight, icon, lines, placeholder } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, styles.wrapperMultiline, highlight ? styles.wrapperHighlight : null]}>
				<FontAwesomeIcon style={[styles.iconBasic, styles.iconMultiline]} icon={icon} size={Measurement.Icon} />
				<TextInput
					style={[styles.fieldBasic, styles.fieldMultiline]}
					value={value}
					multiline={true}
					numberOfLines={lines}
					placeholder={placeholder}
					placeholderTextColor={Color.Primary.Muted}
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
				this.props.onChange(this.state.value, { filled: this.state.value.trim() !== "", valid: this.state.error === null });
			}
		);
	};
}
