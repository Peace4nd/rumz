import { faBeer, faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { ImagePicker, Input } from "../../components";
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
					<Input.Text icon={faBeer} placeholder="lorem ipsum" />
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
