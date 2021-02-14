import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { IInput } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputRangeState {
	error: string;
	value: [number, number];
}

/**
 * Dostupne vlastnosti
 */
export interface IInputRange extends Omit<IInput<[number, number], TextInputProps>, "placeholder" | "icon"> {
	placeholder: [string, string];
	icon: [IconDefinition, IconDefinition];
}

/**
 * Rozsah (nejnizsi a nejvyssi hodnota)
 */
export default class InputRange extends React.PureComponent<IInputRange, IInputRangeState> {
	/**
	 * Vychozi stav
	 */
	public state: IInputRangeState = {
		error: null,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputRange = {
		highlight: false,
		icon: null,
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		validator: null,
		value: [0, 0]
	};

	/**
	 * Reference
	 */
	private ref1: React.RefObject<TextInput> = React.createRef();

	/**
	 * Reference
	 */
	private ref2: React.RefObject<TextInput> = React.createRef();

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
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null]}>
				<Icon style={styles.iconBasic} icon={icon[0]} color={Color.Dark} />
				<TextInput
					ref={this.ref1}
					style={styles.fieldBasic}
					value={value[0] ? String(value[0]) : ""}
					placeholder={placeholder[0]}
					placeholderTextColor={Color.Muted}
					keyboardType="numeric"
					onChangeText={(text) => this.handleChange(0, text)}
					onSubmitEditing={() => {
						this.ref2.current.focus();
					}}
					blurOnSubmit={onSubmit?.blur ?? true}
					returnKeyType={returnKey}
				/>
				<Icon style={styles.iconBasic} icon={icon[1]} color={Color.Dark} />
				<TextInput
					ref={this.ref2}
					style={styles.fieldBasic}
					value={value[1] ? String(value[1]) : ""}
					placeholder={placeholder[1]}
					placeholderTextColor={Color.Muted}
					keyboardType="numeric"
					onChangeText={(text) => this.handleChange(1, text)}
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
		this.ref1.current.focus();
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
				value: [0, 0]
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
	 * @param {number} index Index
	 * @param {string} value Hodnota
	 */
	private handleChange(index: number, value: string): void {
		// rozlozeni props
		const { validator } = this.props;
		const { value: current } = this.state;
		// parsovani hodnoty
		const parsed = parseInt(value, 10) || 0;
		// zmena rozsahu
		current[index] = parsed;
		// aktualizace
		this.setState(
			{
				error: validator ? validator(current) : null,
				value: current
			},
			() => {
				this.props.onChange(current, { filled: current.reduce((prev, cur) => prev + cur, 0) > 0, valid: this.state.error === null });
			}
		);
	}
}
