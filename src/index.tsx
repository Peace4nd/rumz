import React from "react";
import { BackButton, NativeRouter, Route, Switch } from "react-router-native";
import routes from "./routes";

const App = (): JSX.Element => {
	return (
		<NativeRouter>
			<BackButton />
			<Switch>
				{routes.map((route) => (
					<Route key={route.path} exact={true} strict={true} path={route.path} component={route.component} />
				))}
			</Switch>
		</NativeRouter>
	);
};

export default App;
