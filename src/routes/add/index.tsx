import React from "react";
import { View } from "react-native";
import { ImagePicker } from "../../components";
import BaseRoute from "../base";

export default class Add extends BaseRoute {
	protected renderRoute(): JSX.Element {
		return (
			<View>
				<ImagePicker />
			</View>
		);
	}
}
