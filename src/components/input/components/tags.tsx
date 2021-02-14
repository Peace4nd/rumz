import { faTags } from "@fortawesome/free-solid-svg-icons";
import { PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import React from "react";
import { View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { IInput, IInputCore } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
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
export default class InputPicker extends React.PureComponent<IInputPicker, IInputPickerState> implements IInputCore {
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
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
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
		const { highlight, icon, items, placeholder } = this.props;
		const { value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null]}>
				<Icon style={styles.iconBasic} icon={icon} color={Color.Dark} />

				<Menu onSelect={(value) => action.onPress(value)}>
					<MenuTrigger>
						<Icon icon={faTags} color={Color.Highlight} />
					</MenuTrigger>
					<MenuOptions>
						{Object.entries(action.items).map((entry) => (
							<MenuOption key={entry[0]} style={styles.actionOption} value={entry[0]}>
								<Typography type="Body1">{entry[1]}</Typography>
							</MenuOption>
						))}
					</MenuOptions>
				</Menu>
			</View>
		);
	}

	/**
	 * Zamereni
	 */
	public focus(): void {
		return;
	}
}
