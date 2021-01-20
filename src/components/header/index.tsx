import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { Color, Size, Typography } from "../../styles";

export const styles = StyleSheet.create({
	icon: {
		color: Color.Primary.Text
	},
	sectionAction: {
		alignItems: "flex-end",
		flex: 1,
		justifyContent: "center"
	},
	sectionBack: {
		alignItems: "flex-start",
		flex: 1,
		justifyContent: "center"
	},
	sectionTitle: {
		alignItems: "center",
		flex: 2,
		justifyContent: "center"
	},
	title: {
		...Typography.Headline6,
		color: Color.Primary.Text
	},
	wrapper: {
		backgroundColor: Color.Primary.Base,
		flexDirection: "row",
		height: Size["6x"],
		paddingHorizontal: Size["1x"]
	}
});

export interface IHeaderAction {
	icon: IconProp;
	onPress: () => void;
}

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
		const { actions, match, title } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				<View style={styles.sectionBack}>
					{match.path !== "/" && (
						<TouchableOpacity onPress={this.handlePress}>
							<FontAwesomeIcon icon={faChevronLeft} style={styles.icon} size={24} />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.sectionTitle}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.sectionAction}>
					{actions.map((action, index) => (
						<TouchableOpacity key={index} onPress={action.onPress}>
							<FontAwesomeIcon icon={action.icon} style={styles.icon} size={24} />
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
