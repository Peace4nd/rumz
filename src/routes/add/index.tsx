import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { KeyboardAvoidingView, ScrollView, TextInput } from "react-native";
import { ImagePicker } from "../../components";
import { IHeader } from "../../components/header";
import strings from "../../utils/strings";
import BaseRoute from "../base";

export default class Add extends BaseRoute {
	protected setHeaderProps(): IHeader {
		return {
			actions: [
				{
					icon: faCheck,
					onPress: null
				}
			],
			title: strings("headerAdd")
		};
	}
	protected renderRoute(): JSX.Element {
		return (
			<KeyboardAvoidingView behavior="height">
				<ScrollView>
					<ImagePicker />
					<TextInput placeholder="placeholder" />
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
