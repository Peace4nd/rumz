import { faCartPlus, faLightbulb, faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router-native";
import { Header, Navigation } from "../components";
import { IHeader } from "../components/header";
import { Color } from "../styles";
import { RouterPath } from "../utils/router";
import strings from "../utils/strings";

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	wrapper: {
		backgroundColor: Color.White,
		flex: 1
	}
});

/**
 * Obecna routa
 */
export default abstract class BaseRoute<P = unknown, S = unknown, M = unknown> extends React.Component<P & RouteComponentProps<M>, S> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<StatusBar barStyle="default" backgroundColor={Color.Primary.Dark} />
				<SafeAreaView style={styles.wrapper}>
					<KeyboardAvoidingView behavior="height" style={styles.wrapper}>
						<Header {...this.setHeaderProps()} />
						<View style={styles.content}>{this.renderRoute()}</View>
						<Navigation
							tabs={[
								{
									icon: faListUl,
									label: strings("navigationOverview"),
									path: RouterPath["/overview"]
								},
								{
									icon: faLightbulb,
									label: strings("navigationStats"),
									path: RouterPath["/edit/:id"]
								},
								{
									icon: faCartPlus,
									label: strings("navigationCreate"),
									path: RouterPath["/create"]
								}
							]}
						/>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</React.Fragment>
		);
	}

	/**
	 * Vlastni obsah routy
	 *
	 * @returns {JSX.Element} Element
	 */
	protected abstract renderRoute(): JSX.Element;

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	protected abstract setHeaderProps(): IHeader;
}
