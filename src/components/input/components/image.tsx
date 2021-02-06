import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, Pressable, View } from "react-native";
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import { IInput } from "..";
import { Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

interface IInputImageState {
	error: string;
	selected: DocumentPickerResponse;
}

/**
 * Dostupne vlastnosti
 */
export type IInputImage = IInput<DocumentPickerResponse>;

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
		error: null,
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
						this.props.onChange(res, true);
					}
				);
			})
			.catch((error) => {
				if (!DocumentPicker.isCancel(error)) {
					this.setState({
						error: String(error)
					});
				}
			});
	};
}
