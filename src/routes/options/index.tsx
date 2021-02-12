import React from "react";
import { Text } from "react-native";
import { Route } from "../../components";

/**
 * Nastaveni
 */
export default class Options extends Route.Content {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		return (
			<Route.Wrapper>
				<Text>nastaveni</Text>
			</Route.Wrapper>
		);
	}
}
