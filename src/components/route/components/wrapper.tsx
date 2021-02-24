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
export interface IRoute<I> {
	/**
	 * Zaneprazdneno
	 */
	busy?: boolean;

	/**
	 * Hlavicka
	 */
	header: IHeader<I>;

	/**
	 * Navigace
	 */
	navigation?: INavigationTab[];

	/**
	 * Pouzit plny padding
	 */
	padding?: boolean;
}

/**
 * Obecna routa
 */
export default class Route<I extends Record<string, string>> extends React.PureComponent<IRoute<I>> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IRoute<unknown> = {
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
		],
		padding: true
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { busy, header, children, navigation, padding } = this.props;
		// sestaveni a vraceni
		return (
			<React.Fragment>
				<StatusBar barStyle="default" backgroundColor={Color.Dark} />
				<SafeAreaView style={styles.wrapper}>
					<Header {...header} />
					<View style={[styles.content, busy ? styles.contentBusy : null, padding ? styles.contentPadding : null]}>
						{busy ? <Loading /> : children}
					</View>
					<Navigation tabs={navigation} />
				</SafeAreaView>
			</React.Fragment>
		);
	}
}
