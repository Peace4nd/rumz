import React from "react";
import { Text } from "react-native";
import { IHeader } from "../../components/header";
import BaseRoute from "../base";

export default class View extends BaseRoute {
	protected setHeaderProps(): IHeader {
		return {
			title: "El Pasador de Oro XO"
		};
	}
	protected renderRoute(): JSX.Element {
		return <Text>{JSON.stringify(this.props.match)}</Text>;
	}
}
