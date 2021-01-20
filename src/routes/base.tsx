import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { RouteComponentProps } from "react-router-native";
import { Header } from "../components";
import { IHeader } from "../components/header";
import { Color } from "../styles";

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
					{this.renderRoute()}
				</SafeAreaView>
			</React.Fragment>
		);
	}

	protected abstract renderRoute(): JSX.Element;

	protected abstract setHeaderProps(): IHeader;
}
