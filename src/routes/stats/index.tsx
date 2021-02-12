import React from "react";
import { Text } from "react-native";
import { Route } from "../../components";

/**
 * Statistika
 */
export default class Stats extends Route.Content {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		return (
			<Route.Wrapper>
				<Text>statistika</Text>
			</Route.Wrapper>
		);
	}
}
