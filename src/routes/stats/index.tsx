import React from "react";
import { Text } from "react-native";
import { Route } from "../../components";
import strings from "../../utils/strings";

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
			<Route.Wrapper
				title={strings("statsTitle")}
				features={{
					back: true,
					menu: true
				}}
				scrollable={true}
			>
				<Text>statistika</Text>
			</Route.Wrapper>
		);
	}
}
