import { faBars, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router-native";
import { Header, Navigation } from "../components";
import { IHeader } from "../components/header";
import { Color } from "../styles";
import { RouterPath } from "../utils/router";

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	}
});

export default abstract class BaseRoute extends React.Component<RouteComponentProps> {
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<StatusBar barStyle="default" backgroundColor={Color.Primary.Dark} />
				<SafeAreaView style={styles.wrapper}>
					<Header {...this.setHeaderProps()} />
					<View style={styles.wrapper}>{this.renderRoute()}</View>
					<Navigation
						tabs={[
							{
								icon: faBars,
								label: "Přehled",
								path: RouterPath["/overview"]
							},
							{
								icon: faLightbulb,
								label: "Statistika",
								path: RouterPath["/create"]
							}
						]}
					/>
				</SafeAreaView>
			</React.Fragment>
		);
	}

	protected abstract renderRoute(): JSX.Element;

	protected abstract setHeaderProps(): IHeader;
}
