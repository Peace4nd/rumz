import React from "react";
import { BackButton, NativeRouter, Redirect, Route, Switch } from "react-router-native";
import Create from "./routes/create";
import { Collection, Detail } from "./routes/overview";
import { RouterPath } from "./utils/router";

const App = (): JSX.Element => {
	return (
		<NativeRouter>
			<BackButton />
			<Switch>
				<Redirect exact={true} strict={true} from="/" to={RouterPath["/overview"]} />
				<Route exact={true} strict={true} path={RouterPath["/create"]} component={Create} />
				<Route exact={true} strict={true} path={RouterPath["/overview"]} component={Collection} />
				<Route exact={true} strict={true} path={RouterPath["/overview/:id"]} component={Detail} />
				<Route exact={true} strict={true} path={RouterPath["/edit/:id"]} component={null} />
			</Switch>
		</NativeRouter>
	);
};

export default App;
