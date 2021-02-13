import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { IInput, IInputCore } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputMultilineState {
	value: string;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputMultiline extends IInput<string, TextInputProps> {
	lines: number;
}

/**
 * Viceradkovy textovy vstup
 */
export default class InputMultiline extends React.PureComponent<IInputMultiline, IInputMultilineState> implements IInputCore {
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
		const { field, highlight, icon, lines, placeholder } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, styles.wrapperMultiline, highlight ? styles.wrapperHighlight : null]}>
				<Icon style={[styles.iconBasic, styles.iconMultiline]} icon={icon} color={Color.Dark} />
				<TextInput
					{...field}
					ref={this.ref}
					style={[styles.fieldBasic, styles.fieldMultiline]}
					value={value}
					multiline={true}
					numberOfLines={lines}
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
