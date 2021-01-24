import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import { Measurement } from "../../../styles";
import styles from "../styles";

interface IInputImageState {
	selected: DocumentPickerResponse;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputImage {
	onChange: (value: DocumentPickerResponse) => void;
}

/**
 * Obrazkovy vstup
 *
 * @param {InputImage} props Vlastnosti
 * @returns {JSX.Element} Element
 */
export default class InputImage extends React.Component<IInputImage, IInputImageState> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputImage = {
		onChange: null
	};

	/**
	 * Vychozi stav
	 */
	public state: IInputImageState = {
		selected: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { selected } = this.state;
		// sestaveni a vraceni
		return (
			<Pressable style={StyleSheet.flatten([styles.wrapperBasic, styles.wrapperImage])} onPress={this.handleClick}>
				{selected === null && <FontAwesomeIcon style={styles.iconBasic} icon={faImage} size={Measurement.Icon * 2} />}
				{selected !== null && <Image source={{ uri: selected.uri }} resizeMode="contain" style={styles.image} />}
			</Pressable>
		);
	}
	// view se ctvereckem a klikatkem uprostred. po nahrani se soubor ulozi a zobrazi se preview v tom okynku

	private handleClick = (): void => {
		DocumentPicker.pick({
			type: [DocumentPicker.types.images]
		})
			.then((res) => {
				this.setState(
					{
						selected: res
					},
					() => {
						this.props.onChange(res);
					}
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
