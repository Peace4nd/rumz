import { faImage, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, Pressable, View } from "react-native";
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import { IInput } from "..";
import { Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

interface IInputImageState {
	selected: DocumentPickerResponse;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputImage extends Omit<IInput<DocumentPickerResponse>, "value" | "icon"> {
	icon?: IconDefinition;
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
		icon: faImage,
		onChange: null,
		placeholder: null
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
		const { icon, placeholder } = this.props;
		const { selected } = this.state;
		// sestaveni a vraceni
		return (
			<Pressable style={[styles.wrapperBasic, styles.wrapperImage]} onPress={this.handleClick}>
				{selected === null && (
					<View style={styles.wrapperFill}>
						<FontAwesomeIcon style={[styles.iconBasic, styles.iconBasicVertical]} icon={icon} size={Measurement.Icon * 2} />
						{placeholder && (
							<Typography type="Body1" style={styles.placeholder}>
								{placeholder}
							</Typography>
						)}
					</View>
				)}
				{selected !== null && <Image source={{ uri: selected.uri }} resizeMode="contain" style={styles.image} />}
			</Pressable>
		);
	}

	/**
	 * Otevreni vyberu souboru
	 */
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
