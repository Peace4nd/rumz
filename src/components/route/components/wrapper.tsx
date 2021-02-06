import { faCartPlus, faLightbulb, faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { KeyboardAvoidingView, SafeAreaView, StatusBar, View } from "react-native";
import { Color } from "../../../styles";
import strings from "../../../utils/strings";
import Header, { IHeader } from "../../header";
import Loading from "../../loading";
import Navigation, { INavigation } from "../../navigation";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IRoute {
	busy?: boolean;
	header: IHeader;
	navigation?: INavigation;
}

/**
 * Obecna routa
 */
export default class Route extends React.Component<IRoute> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IRoute = {
		busy: false,
		header: null,
		navigation: {
			tabs: [
				{
					icon: faListUl,
					label: strings("navigationOverview"),
					path: "/overview"
				},
				{
					icon: faLightbulb,
					label: strings("navigationStats"),
					path: "/edit/:id"
				},
				{
					icon: faCartPlus,
					label: strings("navigationCreate"),
					path: "/create"
				}
			]
		}
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { busy, header, children, navigation } = this.props;
		// sestaveni a vraceni
		return (
			<React.Fragment>
				<StatusBar barStyle="default" backgroundColor={Color.Primary.Dark} />
				<SafeAreaView style={styles.wrapper}>
					<KeyboardAvoidingView behavior="height" style={styles.wrapper}>
						<Header {...header} />
						<View style={styles.content}>
							{children}
							{busy && <Loading />}
						</View>
						<Navigation {...navigation} />
					</KeyboardAvoidingView>
				</SafeAreaView>
			</React.Fragment>
		);
	}
}
