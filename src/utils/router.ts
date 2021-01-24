import { ComponentType } from "react";
import { ExtractRouteParams, generatePath } from "react-router";

/**
 * Definice dostupnych rout
 */
const routes = {
	"/create": null,
	"/edit/:id": null,
	"/overview": null,
	"/overview/:id": null
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
