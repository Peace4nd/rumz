import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Measurement } from "../../styles";
import Typography from "../typography";
import styles from "./styles";

/**
 * Akce
 */
export interface IHeaderAction {
	icon: IconDefinition;
	disabled?: boolean;
	onPress: () => void;
}

/**
 * Dostupne vlastnosti
 */
export interface IHeader {
	title: string;
	actionLeft?: IHeaderAction;
	actionRight?: IHeaderAction;
}

/**
 * Hlavicka
 */
export default class Header extends React.PureComponent<IHeader> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IHeader = {
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
				<View style={styles.sectionAction}>
					{actionLeft && (
						<TouchableOpacity onPress={actionLeft.onPress} disabled={actionLeft.disabled || false}>
							<FontAwesomeIcon icon={actionLeft.icon} style={styles.icon} size={Measurement.Icon} />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.sectionTitle}>
					<Typography type="Headline6" style={styles.title}>
						{title}
					</Typography>
				</View>
				<View style={styles.sectionAction}>
					{actionRight && (
						<TouchableOpacity onPress={actionRight.onPress} disabled={actionRight.disabled || false}>
							<FontAwesomeIcon icon={actionRight.icon} style={styles.icon} size={Measurement.Icon} />
						</TouchableOpacity>
					)}
				</View>
			</View>
		);
	}
}
