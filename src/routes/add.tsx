import React from "react";
import { View } from "react-native";
import { ImagePicker } from "../components";

export default class Add extends React.Component {
	public render(): JSX.Element {
		return (
			<View>
				<ImagePicker />
			</View>
		);
	}
}
