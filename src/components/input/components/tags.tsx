import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
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
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, styles.wrapperTags, styles.wrapperSpring]}>
				{icon && <Icon style={styles.iconBasic} definition={icon} color="Dark" />}

				<View style={styles.fieldTags}>
					{value.length === 0 && (
						<Typography type="Body2" style={styles.fieldPlaceholder}>
							{placeholder}
						</Typography>
					)}

					{value.length > 0 && <Tags items={value} onPress={null} />}
				</View>

				<View style={styles.buttonGroup}>
					<Menu
						onSelect={(selected: string) => {
							this.setState(
								{
									value: [...this.state.value, selected]
								},
								() => {
									this.props.onChange(this.state.value, { filled: true, valid: true });
								}
							);
						}}
					>
						<MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerWrapper: styles.buttonElement }}>
							<Icon definition={faPlus} color="Base" />
						</MenuTrigger>
						<MenuOptions>
							{items
								.filter((item) => !this.state.value.includes(item))
								.map((item, index) => (
									<MenuOption key={index} value={item}>
										<Typography type="Body1">{item}</Typography>
									</MenuOption>
								))}
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
}
