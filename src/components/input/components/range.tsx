import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TextInput, View } from "react-native";
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
export interface IInputRange extends Omit<IInput<[number, number]>, "placeholder" | "icon"> {
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
		placeholder: null,
		validator: null,
		value: [null, null]
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
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null]}>
				<Icon style={styles.iconBasic} icon={icon[0]} color={Color.Dark} />
				<TextInput
					style={styles.fieldBasic}
					value={value[0] ? String(value[0]) : ""}
					placeholder={placeholder[0]}
					placeholderTextColor={Color.Muted}
					keyboardType="numeric"
					onChangeText={(text) => this.handleChange(0, text)}
				/>
				<Icon style={styles.iconBasic} icon={icon[1]} color={Color.Dark} />
				<TextInput
					style={styles.fieldBasic}
					value={value[1] ? String(value[1]) : ""}
					placeholder={placeholder[1]}
					placeholderTextColor={Color.Muted}
					keyboardType="numeric"
					onChangeText={(text) => this.handleChange(1, text)}
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
	 * @param {number} index Index
	 * @param {string} value Hodnota
	 */
	private handleChange(index: number, value: string): void {
		// rozlozeni props
		const { validator } = this.props;
		const { value: current } = this.state;
		// parsovani hodnoty
		const parsed = parseInt(value, 10);
		// zmena rozsahu
		current[index] = parsed;
		// aktualizace
		this.setState(
			{
				error: validator ? validator(current) : null,

				value: current
			},
			() => {
				this.props.onChange(current, { filled: parsed !== null, valid: this.state.error === null });
			}
		);
	}
}
