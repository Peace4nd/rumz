import React from "react";
import { TextInput, View } from "react-native";
import { IInput, IInputCore } from "..";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputSpinnerState {
	value: number;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputSpinner extends IInput<number> {
	max: number;
	min: number;
	step: number;
}

/**
 * Ciselny vstup
 */
export default class InputNumber extends React.PureComponent<IInputSpinner, IInputSpinnerState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputSpinnerState = {
		error: null,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputSpinner = {
		highlight: false,
		icon: null,
		max: -Infinity,
		min: Infinity,
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		step: 1,
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
		const { highlight, icon, onSubmit, placeholder, returnKey } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null, error ? styles.wrapperError : null]}>
				{icon && <Icon style={styles.iconBasic} definition={icon} color="Dark" />}
				<TextInput
					ref={this.ref}
					style={styles.fieldBasic}
					value={value ? String(value) : ""}
					placeholder={placeholder}
					placeholderTextColor="Muted"
					keyboardType="numeric"
					onChangeText={this.handleChange}
					onSubmitEditing={this.handleSubmit}
					blurOnSubmit={onSubmit?.blur ?? true}
					returnKeyType={returnKey}
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
	 * Odeslani hodnoty
	 */
	private handleSubmit = (): void => {
		// rozlozeni props
		const { onSubmit } = this.props;
		// reset hodnoty
		if (onSubmit.reset) {
			this.setState({
				value: 0
			});
		}
		// handler
		if (typeof onSubmit?.handler === "function") {
			onSubmit.handler();
		}
	};

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
