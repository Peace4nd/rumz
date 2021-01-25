import React from "react";
import { Permission, PermissionsAndroid } from "react-native";
import { BackButton, NativeRouter, Redirect, Route, Switch } from "react-router-native";
import Create from "./routes/create";
import { Collection, Detail } from "./routes/overview";
import { RouterPath } from "./utils/router";

/**
 * Aplikacni vstupni bod
 */
class App extends React.Component {
	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		this.requestPermissions();
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
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
	}

	/**
	 * Ziskani potrebnych opravneni
	 *
	 * @returns {Promise<boolean>} Opravneni byla pridelena
	 */
	private async requestPermissions(): Promise<boolean> {
		// definice
		const permissions: Permission[] = [];
		let granted: boolean = true;
		// cteni z uloziste
		const pRead = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
		if (!pRead) {
			permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
		}
		// ziskani potrebnych opravneni
		if (permissions.length > 0) {
			// pozadavek na opravneni
			const response = await PermissionsAndroid.requestMultiple(permissions);
			// overeni ze potrebna opravneni byla pridelena
			for (const permission in response) {
				granted = granted && response[permission] === PermissionsAndroid.RESULTS.GRANTED;
			}
		}
		// vraceni
		return granted;
	}
}

export default App;
