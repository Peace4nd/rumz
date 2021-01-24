import { faChevronLeft, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { History } from "history";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { Measurement } from "../../styles";
import { RouterPath } from "../../utils/router";
import styles from "./styles";

/**
 * Akce
 */
export interface IHeaderAction {
	icon: IconDefinition;
	disabled?: boolean;
	onPress: (history: History) => void;
}

/**
 * Dostupne vlastnosti
 */
export interface IHeader {
	title: string;
	actions?: IHeaderAction[];
}

/**
 * Hlavicka
 */
class Header extends React.Component<IHeader & RouteComponentProps> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IHeader = {
		actions: [],
		title: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { actions, history, match, title } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				<View style={styles.sectionBack}>
					{match.path !== RouterPath["/overview"] && (
						<TouchableOpacity onPress={this.handlePress}>
							<FontAwesomeIcon icon={faChevronLeft} style={styles.icon} size={Measurement.Icon} />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.sectionTitle}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.sectionAction}>
					{actions.map((action, index) => (
						<TouchableOpacity key={index} onPress={() => action.onPress(history)} disabled={action.disabled || false}>
							<FontAwesomeIcon icon={action.icon} style={styles.icon} size={Measurement.Icon} />
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	}

	/**
	 * Krok zpet
	 */
	private handlePress = (): void => {
		this.props.history.goBack();
	};
}

export default withRouter(Header);
