import { ComponentType } from "react";
import { ExtractRouteParams, generatePath } from "react-router";
import Create from "../routes/create";
import Detail from "../routes/detail";
import Overview from "../routes/overview";

/**
 * Definice dostupnych rout
 */
const routes = {
	"/create": Create,
	"/detail/:id": Detail,
	"/edit/:id": null,
	"/overview": Overview
};

export type IRouterAvailable = keyof typeof routes;

export type IRouterPath = Record<IRouterAvailable, string>;
export type IRouterList = Array<{
	path: IRouterAvailable;
	component: ComponentType;
}>;

/**
 * Sestaveni cesty pro presmerovani
 *
 * @param {P} path Cesta
 * @param {ExtractRouteParams<P>} params Parametry
 * @returns {string} Cesta
 */
export function preparePath<P extends IRouterAvailable>(path: P, params?: ExtractRouteParams<P>): string {
	return generatePath(path, params);
}

/**
 * Dostupne routy
 */
export const RouterPath: IRouterPath = Object.keys(routes).reduce((paths, value) => {
	paths[value] = value;
	return paths;
}, {} as IRouterPath);

/**
 * Pole existujicich rout
 */
export const RouterList: IRouterList = Object.entries(routes).map((route) => ({
	component: route[1] as ComponentType,
	path: route[0] as IRouterAvailable
}));
