import React from "react";
import { Text } from "react-native";
import BaseRoute from "../base";

export default class View extends BaseRoute {
	protected renderRoute(): JSX.Element {
		return <Text>{JSON.stringify(this.props.match)}</Text>;
	}
}
