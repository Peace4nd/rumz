import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Icon } from "..";
import { Color } from "../../styles";
import Typography from "../typography";
import styles from "./styles";

/**
 * Akce
 */
export interface IHeaderAction<I> {
	icon: IconDefinition;
	onPress: (item?: keyof I) => void;
	disabled?: boolean;
	items?: I;
}

/**
 * Dostupne vlastnosti
 */
export interface IHeader<I> {
	title: string;
	actionLeft?: IHeaderAction<I>;
	actionRight?: IHeaderAction<I>;
}

/**
 * Hlavicka
 */
export default class Header<I extends Record<string, string>> extends React.PureComponent<IHeader<I>> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IHeader<unknown> = {
		actionLeft: null,
		actionRight: null,
		title: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { actionLeft, actionRight, title } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				<View style={styles.sectionAction}>{this.renderAction(actionLeft)}</View>
				<View style={styles.sectionTitle}>
					<Typography type="Headline6" style={styles.title}>
						{title}
					</Typography>
				</View>
				<View style={styles.sectionAction}>{this.renderAction(actionRight)}</View>
			</View>
		);
	}

	/**
	 * Sestaveni akce
	 *
	 * @param {IHeaderAction} action Definice akce
	 * @returns {JSX.Element} Element
	 */
	private renderAction(action: IHeaderAction<I>): JSX.Element {
		if (action) {
			// menu
			if (action.items) {
				return (
					<Menu onSelect={(value) => action.onPress(value)}>
						<MenuTrigger>
							<Icon icon={action.icon} color={Color.Highlight} />
						</MenuTrigger>
						<MenuOptions>
							{Object.entries(action.items).map((entry) => (
								<MenuOption key={entry[0]} style={styles.actionOption} value={entry[0]}>
									<Typography type="Body1">{entry[1]}</Typography>
								</MenuOption>
							))}
						</MenuOptions>
					</Menu>
				);
			}
			// vychozi akce
			return (
				<TouchableOpacity onPress={() => action.onPress()} disabled={action.disabled || false}>
					<Icon icon={action.icon} color={Color.Highlight} />
				</TouchableOpacity>
			);
		}
		// zadna akce
		return null;
	}
}
