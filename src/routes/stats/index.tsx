import React from "react";
import { Text } from "react-native";
import "react-native-get-random-values";
import { Route } from "../../components";

/**
 * Statistika
 */
export default class Add extends Route.Content {
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
