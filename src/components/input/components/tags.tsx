import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { IInput, IInputCore } from "..";
import Icon from "../../icon";
import Tags from "../../tags";
import Typography from "../../typography";
import styles from "../styles";

interface IInputTagsState {
	value: string[];
}

/**
 * Dostupne vlastnosti
 */
export interface IInputTags extends IInput<string[]> {
	items: string[];
}

/**
 * Vyberovy vstup
 */
export default class InputTags extends React.PureComponent<IInputTags, IInputTagsState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputTagsState = {
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputTags = {
		highlight: false,
		icon: null,
		items: [],
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		validator: null,
		value: []
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, items, placeholder } = this.props;
		const { value } = this.state;
		// osetreni nicoty
		const safeItems = items || [];
		const safeValue = value || [];
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, icon ? styles.wrapperIcon : null, styles.wrapperButton, styles.wrapperSpring]}>
				{icon && <Icon style={styles.icon} definition={icon} color="Dark" />}
				{safeValue.length === 0 && (
					<Typography type="Body1" style={[styles.fieldBasic, styles.fieldPlaceholder]}>
						{placeholder}
					</Typography>
				)}
				{safeValue.length > 0 && (
					<View style={styles.fieldTags}>
						<Tags items={safeValue} onDelete={this.handleRemove} />
					</View>
				)}
				<View style={styles.buttonGroup} pointerEvents={safeItems.length ? "auto" : "none"}>
					<Menu onSelect={this.handleAdd}>
						<MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerWrapper: styles.buttonElement }}>
							<Icon definition={faPlus} color={safeItems.length ? "Base" : "Muted"} />
						</MenuTrigger>
						<MenuOptions>
							<ScrollView style={styles.menuScroll}>
								{safeItems
									.filter((item) => !safeValue.includes(item))
									.sort()
									.map((item, index) => (
										<MenuOption key={index} value={item} style={styles.menuItem}>
											<Typography type="Body1">{item}</Typography>
										</MenuOption>
									))}
							</ScrollView>
						</MenuOptions>
					</Menu>
				</View>
			</View>
		);
	}

	/**
	 * Zamereni
	 */
	public focus(): void {
		return;
	}

	/**
	 * Obecne zpracovani zmeny
	 *
	 * @param {string[]} value Hodnota
	 */
	private handleChange(value: string[]): void {
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(value, { filled: true, valid: true });
			}
		);
	}

	/**
	 * Pridani
	 *
	 * @param {string} value Hodnota
	 */
	private handleAdd = (value: string): void => {
		this.handleChange([...this.state.value, value]);
	};

	/**
	 * Odebrani
	 *
	 * @param {string} value Hodnota
	 */
	private handleRemove = (value: string): void => {
		// definice
		const current = this.state.value.slice(0);
		const index = current.indexOf(value);
		// index existuje
		if (index > -1) {
			current.splice(index, 1);
			this.handleChange(current);
		}
	};
}
