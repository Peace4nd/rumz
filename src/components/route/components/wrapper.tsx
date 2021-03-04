import { faArrowLeft, faCartPlus, faEllipsisV, faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { Color } from "../../../styles";
import strings from "../../../utils/strings";
import Header, { IHeaderAction } from "../../header";
import Loading from "../../loading";
import Navigation, { INavigationTab } from "../../navigation";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IRoute {
	/**
	 * Nadpis
	 */
	title: string;

	/**
	 * Funkce
	 */
	features?: {
		/**
		 * Zpet
		 */
		back?: boolean;

		/**
		 * Vyhledavani
		 */
		search?: boolean;

		/**
		 * Menu
		 */
		menu?: boolean;
	};

	/**
	 * Navigace
	 */
	navigation?: INavigationTab[];

	/**
	 * Akce
	 */
	actions?: IHeaderAction[];

	/**
	 * Zaneprazdneno
	 */
	busy?: boolean;

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
export default class Route extends React.PureComponent<IRoute> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IRoute = {
		actions: [],
		busy: false,
		features: {
			back: false,
			menu: false,
			search: false
		},
		navigation: [
			{
				icon: faListUl,
				label: strings("navigationOverview"),
				path: "/overview"
			},
			{
				icon: faCartPlus,
				label: strings("navigationCreate"),
				path: "/create"
			}
		],
		padding: true,
		scrollable: false,
		title: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { actions, features, navigation, title } = this.props;
		// definice
		const preparedActions: IHeaderAction[] = actions.slice(0);
		// vyhledavani
		if (features.search) {
			preparedActions.push({
				icon: faSearch,
				onPress: null,
				type: "press"
			});
		}
		// menu
		if (features.menu) {
			preparedActions.push({
				icon: faEllipsisV,
				items: [
					{
						label: strings("optionsTitle"),
						path: "/options",
						type: "path"
					},
					{
						label: strings("statsTitle"),
						path: "/stats",
						type: "path"
					}
				],
				type: "menu"
			});
		}
		// sestaveni a vraceni
		return (
			<React.Fragment>
				<StatusBar barStyle="default" backgroundColor={Color.Dark} />
				<SafeAreaView style={styles.wrapper}>
					<Header
						title={title}
						back={
							features.back
								? {
										icon: faArrowLeft,
										path: "/overview",
										type: "path"
								  }
								: null
						}
						actions={preparedActions}
					/>
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
				<ScrollView
					keyboardDismissMode="on-drag"
					style={styles.contentWrapper}
					contentContainerStyle={[padding ? styles.contentPaddingFull : styles.contentPaddingHalf]}
				>
					{busy ? <Loading /> : children}
				</ScrollView>
			);
		}
		// standardni view
		return <View style={[styles.contentWrapper, padding ? styles.contentPaddingFull : styles.contentPaddingHalf]}>{busy ? <Loading /> : children}</View>;
	}
}
