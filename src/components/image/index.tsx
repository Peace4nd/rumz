import React from "react";
import { Image as NativeImage, StyleProp, View, ViewStyle } from "react-native";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IImage {
	source: string;
	style?: StyleProp<ViewStyle>;
}

/**
 * Obrazek
 *
 * @param {IImage} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Image = (props: IImage): JSX.Element => {
	// rozlozeni props
	const { source, style } = props;
	// sestaveni a vraceni
	return (
		<View style={[styles.wrapper, style]}>
			<NativeImage source={{ uri: "file://" + source }} resizeMode="contain" style={styles.image} />
		</View>
	);
};

// export
export default Image;
