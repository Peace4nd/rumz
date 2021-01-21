import React from "react";
import { BackButton, NativeRouter, Redirect, Route, Switch } from "react-router-native";
import { RouterList, RouterPath } from "./utils/router";

const App = (): JSX.Element => {
	return (
		<NativeRouter>
			<BackButton />
			<Switch>
				<Redirect exact={true} strict={true} from="/" to={RouterPath["/overview"]} />
				{RouterList.map((route) => (
					<Route key={route.path} exact={true} strict={true} path={route.path} component={route.component} />
				))}
			</Switch>
		</NativeRouter>
	);
};

export default App;
