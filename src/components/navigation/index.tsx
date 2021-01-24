import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { matchPath } from "react-router";
import { Link, RouteComponentProps, withRouter } from "react-router-native";
import { Measurement } from "../../styles";
import styles from "./styles";

/**
 * Akce
 */
export interface INavigationTab {
	icon: IconDefinition;
	path: string;
	label: string;
}

/**
 * Dostupne vlastnosti
 */
export interface INavigation {
	tabs: INavigationTab[];
}

/**
 * Hlavicka
 */
class Navigation extends React.Component<INavigation & RouteComponentProps> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: INavigation = {
		tabs: []
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { tabs, match } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				{tabs.map((tab) => {
					// overeni cesty
					const matched = matchPath(match.url, {
						path: tab.path
					});
					// sestaveni a vraceni
					return (
						<Link to={tab.path} key={tab.path} component={TouchableOpacity} style={styles.tab}>
							<FontAwesomeIcon
								icon={tab.icon}
								size={Measurement.Icon}
								style={StyleSheet.flatten([styles.tabIcon, matched !== null ? styles.tabActive : null])}
							/>
							<Text style={StyleSheet.flatten([styles.tabText, matched !== null ? styles.tabActive : null])}>{tab.label}</Text>
						</Link>
					);
				})}
			</View>
		);
	}
}

export default withRouter(Navigation);
