import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { Add, Header } from "./components";
import RouteAdd from "./routes/add";
import RouteHome from "./routes/home";
import RouteView from "./routes/view";
import { Color } from "./styles";

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	}
});

const App = (): JSX.Element => {
	return (
		<NativeRouter>
			<StatusBar barStyle="default" backgroundColor={Color.Primary.Dark} />
			<Header />
			<SafeAreaView style={styles.wrapper}>
				<Route exact={true} path="/" component={RouteHome} />
				<Route path="/add" component={RouteAdd} />
				<Route path="/view/:id" component={RouteView} />
				<Add />
			</SafeAreaView>
		</NativeRouter>
	);
};

export default App;
