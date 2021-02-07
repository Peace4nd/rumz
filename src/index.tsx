import React from "react";
import { Permission, PermissionsAndroid } from "react-native";
import { BackButton, NativeRouter, Redirect, Route, Switch } from "react-router-native";
import { Push, Update } from "./routes/create";
import { Collection, Detail } from "./routes/overview";
import Stats from "./routes/stats";

/**
 * Aplikacni vstupni bod
 */
class App extends React.PureComponent {
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
					<Redirect exact={true} strict={true} from="/" to={"/overview"} />
					<Route exact={true} strict={true} path={"/overview"} component={Collection} />
					<Route exact={true} strict={true} path={"/overview/:id"} component={Detail} />
					<Route exact={true} strict={true} path={"/create"} component={Push} />
					<Route exact={true} strict={true} path={"/create/:id"} component={Update} />
					<Route exact={true} strict={true} path={"/stats"} component={Stats} />
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
