import { ExtractRouteParams, generatePath } from "react-router";

/**
 * Definice dostupnych rout
 */
const routes = {
	Create: "/create",
	Detail: "/overview/:id",
	Edit: "/edit/:id",
	Overview: "/overview"
};

/**
 * Dostupne routy
 */
export type IRouterAvailable = keyof typeof routes;

/**
 * Mapa dostupnych rout
 */
export type IRouterPath = Record<IRouterAvailable, string>;

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
export const RouterPath: IRouterPath = Object.entries(routes).reduce((paths, entry) => {
	paths[entry[0]] = entry[1];
	return paths;
}, {} as IRouterPath);
