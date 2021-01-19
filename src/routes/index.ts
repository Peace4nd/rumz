import { ComponentType } from "react";
import Add from "./add";
import Main from "./main";
import View from "./view";

export interface IRoute {
	/**
	 * Prirazena komponenta
	 */
	component: ComponentType;

	/**
	 * Cesta
	 */
	path: string;
}

const routes: IRoute[] = [
	{
		component: View,
		path: "/view/:id"
	},
	{
		component: null,
		path: "/edit/:id"
	},
	{
		component: Add,
		path: "/add"
	},
	{
		component: Main,
		path: "/"
	}
];

export default routes;
