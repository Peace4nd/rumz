import { Picker } from "@react-native-picker/picker";
import { PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import React from "react";
import { View } from "react-native";
import { IInput } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputPickerState {
	value: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputPicker extends IInput<string> {
	items: PickerItemProps[];
}

/**
 * Vyberovy vstup
 */
export default class InputPicker extends React.PureComponent<IInputPicker, IInputPickerState> {
	/**
	 * Vychozi stav
	 */
	public state: IInputPickerState = {
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputPicker = {
		highlight: false,
		icon: null,
		items: [],
		onChange: null,
		placeholder: null,
		validator: null,
		value: ""
	};

	/**
	 * Aktualizace komponenty
	 *
	 * @param {IInputPicker} prevProps Predchozi vlastnosti
	 */
	public componentDidUpdate(prevProps: IInputPicker): void {
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
		const { highlight, icon, items, placeholder } = this.props;
		const { value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null]}>
				<Icon style={styles.iconBasic} icon={icon} color={Color.Dark} />
				<Picker selectedValue={value} style={styles.fieldBasic} mode="dialog" prompt={placeholder} onValueChange={this.handleChange}>
					{items.map((item) => (
						<Picker.Item key={item.value} {...item} />
					))}
				</Picker>
				{!value && (
					<Typography type="Body1" style={[styles.placeholder, styles.placeholderOverlay, highlight ? styles.placeholderHighlight : null]}>
						{placeholder}
					</Typography>
				)}
			</View>
		);
	}

	/**
	 * Zmena
	 *
	 * @param {string} value Hodnota
	 */
	private handleChange = (value: string): void => {
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(value, { filled: true, valid: true });
			}
		);
	};
}
