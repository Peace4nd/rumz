import { faChevronLeft, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { History } from "history";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { Measurement } from "../../styles";
import { RouterPath } from "../../utils/router";
import Typography from "../typography";
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
				<View style={styles.sectionAction}>
					{match.path !== RouterPath.Overview && (
						<TouchableOpacity onPress={this.handlePress}>
							<FontAwesomeIcon icon={faChevronLeft} style={styles.icon} size={Measurement.Icon} />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.sectionTitle}>
					<Typography type="Headline6" style={styles.title}>
						{title}
					</Typography>
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
