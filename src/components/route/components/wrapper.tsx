import { faCartPlus, faLightbulb, faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { Color } from "../../../styles";
import strings from "../../../utils/strings";
import Header, { IHeader } from "../../header";
import Loading from "../../loading";
import Navigation, { INavigationTab } from "../../navigation";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IRoute {
	/**
	 * Zaneprazdneno
	 */
	busy?: boolean;

	/**
	 * Hlavicka
	 */
	header: IHeader;

	/**
	 * Navigace
	 */
	navigation?: INavigationTab[];
}

/**
 * Obecna routa
 */
export default class Route extends React.PureComponent<IRoute> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IRoute = {
		busy: false,
		header: null,
		navigation: [
			{
				icon: faListUl,
				label: strings("navigationOverview"),
				path: "/overview"
			},
			{
				icon: faLightbulb,
				label: strings("navigationStats"),
				path: "/stats"
			},
			{
				icon: faCartPlus,
				label: strings("navigationCreate"),
				path: "/create"
			}
		]
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
					<Header {...header} />
					<View style={styles.content}>
						{children}
						{busy && <Loading />}
					</View>
					<Navigation tabs={navigation} />
				</SafeAreaView>
			</React.Fragment>
		);
	}
}
