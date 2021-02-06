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
class InputMultiline extends React.Component<IInputMultiline, IInputMultilineState> {
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
		icon: null,
		lines: 5,
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
		const { icon, lines, placeholder } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, styles.wrapperMultiline]}>
				<FontAwesomeIcon style={[styles.iconBasic, styles.iconMultiline]} icon={icon} size={Measurement.Icon} />
				<TextInput
					style={[styles.fieldBasic, styles.fieldMultiline]}
					value={value}
					multiline={true}
					numberOfLines={lines}
					placeholder={placeholder}
					placeholderTextColor={Color.Primary.Muted}
					onChangeText={this.handleChange}
					onEndEditing={this.handleDone}
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
export default InputMultiline;
