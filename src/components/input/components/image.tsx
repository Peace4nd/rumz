import React from "react";
import { Image, Pressable, View } from "react-native";
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import FetchBlob from "react-native-fetch-blob";
import { IInput, IInputCore } from "..";
import { IFileDocument } from "../../../types/file";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputImageState {
	error: string;
	selected: DocumentPickerResponse;
}

/**
 * Dostupne vlastnosti
 */
export type IInputImage = IInput<IFileDocument>;

/**
 * Obrazkovy vstup
 *
 * @param {InputImage} props Vlastnosti
 * @returns {JSX.Element} Element
 */
export default class InputImage extends React.PureComponent<IInputImage, IInputImageState> implements IInputCore {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputImage = {
		highlight: false,
		icon: null,
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		validator: null,
		value: null
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
		const { icon, placeholder, value } = this.props;
		const { selected } = this.state;
		// cesta k obrazku
		const path = selected?.uri || value?.path;
		// sestaveni a vraceni
		return (
			<Pressable style={[styles.wrapperBasic, styles.wrapperImage]} onPress={this.handleClick}>
				{!path && (
					<View style={[styles.fieldBasic, styles.fieldCenter]}>
						{icon && <Icon style={styles.icon} definition={icon} color="Dark" size="6x" />}
						{placeholder && (
							<Typography type="Body1" style={styles.placeholder}>
								{placeholder}
							</Typography>
						)}
					</View>
				)}
				{path && <Image source={{ uri: path }} resizeMode="contain" style={styles.image} />}
			</Pressable>
		);
	}

	/**
	 * Zamereni
	 */
	public focus(): void {
		this.handleClick();
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
						FetchBlob.fs.stat(decodeURIComponent(res.fileCopyUri)).then((stat) => {
							this.props.onChange(
								{
									filename: stat.filename,
									lastModified: new Date(stat.lastModified),
									mime: res.type,
									path: stat.path,
									size: parseInt(stat.size, 10)
								},
								{ filled: true, valid: true }
							);
						});
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
