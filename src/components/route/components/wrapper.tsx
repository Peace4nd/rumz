import { faCartPlus, faLightbulb, faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
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

	/**
	 * Skrolovani
	 */
	scrollable?: boolean;
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
		padding: true,
		scrollable: false
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { header, navigation } = this.props;
		// sestaveni a vraceni
		return (
			<React.Fragment>
				<StatusBar barStyle="default" backgroundColor={Color.Dark} />
				<SafeAreaView style={styles.wrapper}>
					<Header {...header} />
					{this.renderContent()}
					<Navigation tabs={navigation} />
				</SafeAreaView>
			</React.Fragment>
		);
	}

	/**
	 * Sestaveni obsahu
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderContent(): JSX.Element {
		// rozlozeni props
		const { busy, children, padding, scrollable } = this.props;
		// loading
		if (busy) {
			return (
				<View style={[styles.contentWrapper, styles.contentBusy]}>
					<Loading />
				</View>
			);
		}
		// skrolovani
		if (scrollable) {
			return (
				<ScrollView keyboardDismissMode="on-drag" style={styles.contentWrapper} contentContainerStyle={[padding ? styles.contentPadding : null]}>
					{busy ? <Loading /> : children}
				</ScrollView>
			);
		}
		// standardni view
		return <View style={[styles.contentWrapper, padding ? styles.contentPadding : null]}>{busy ? <Loading /> : children}</View>;
	}
}
