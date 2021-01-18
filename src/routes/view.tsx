import React from "react";
import { Text } from "react-native";
import { RouteComponentProps } from "react-router-native";

export default class View extends React.Component<RouteComponentProps> {
	public render(): JSX.Element {
		return <Text>{JSON.stringify(this.props.match)}</Text>;
	}
}
