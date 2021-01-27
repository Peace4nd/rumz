import { ExtractRouteParams, generatePath, matchPath } from "react-router";

/**
 * Dostupne routy
 */
export type IRouterPath = "/create" | "/overview/:id" | "/edit/:id" | "/overview";

/**
 * Sestaveni cesty pro presmerovani
 *
 * @param {P} path Cesta
 * @param {ExtractRouteParams<P>} params Parametry
 * @returns {string} Cesta
 */
export function getRouterPath<P extends IRouterPath>(path: P, params?: ExtractRouteParams<P>): string {
	// pokud nejsou definovany parametry, vraci se pouze cesta
	if (!params) {
		return path;
	}
	// jinak se sestavi
	return generatePath(path, params);
}

/**
 * Overeni ouhlasu pozadovane cesty a aktualniho URL
 *
 * @param {IRouterPath} path Pozadovana cesta
 * @param {string} url URL
 * @returns {boolean} Souhlas
 */
export function matchRouterPath(path: IRouterPath, url: string): boolean {
	// overeni
	const match = matchPath(url, {
		exact: true,
		path,
		strict: false
	});
	// vyhodnoceni
	return match !== null;
}
