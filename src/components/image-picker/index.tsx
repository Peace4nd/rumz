import React from "react";
import { Pressable, Text } from "react-native";
import DocumentPicker from "react-native-document-picker";

export default class ImagePicker extends React.Component {
	public render(): JSX.Element {
		return (
			<Pressable onPress={this.handleClick}>
				<Text>obrazek</Text>
			</Pressable>
		);
	}
	// view se ctvereckem a klikatkem uprostred. po nahrani se soubor ulozi a zobrazi se preview v tom okynku

	private handleClick = (): void => {
		DocumentPicker.pick({
			type: [DocumentPicker.types.images]
		})
			.then((res) => {
				console.log(
					res.uri,
					res.type, // mime type
					res.name,
					res.size
				);
			})
			.catch((err) => {
				if (DocumentPicker.isCancel(err)) {
					console.log("CANCELED");
				} else {
					console.log("FUCKED UP", err);
				}
			});
	};
}
