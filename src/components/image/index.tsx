import React from "react";
import { Image as NativeImage, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IImage<B> {
	/**
	 * Zdroj
	 */
	source: string;

	/**
	 * Holy obrazek
	 */
	bare?: B;

	/**
	 * Doplnkove styly
	 */
	style?: B extends true ? StyleProp<ImageStyle> : StyleProp<ViewStyle>;
}

/**
 * Obrazek
 *
 * @param {IImage | IImageBare} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Image = <B extends boolean>(props: IImage<B>): JSX.Element => {
	// rozlozeni props
	const { bare, source, style } = props;
	// overeni existence protokolu
	let uri = source;
	if (!/^(file|content):\/\//.test(source)) {
		uri = "file://" + source;
	}
	// cache busting
	if (/^file:\/\//.test(uri)) {
		uri += "?busting=" + new Date().getTime().toString();
	}
	// holy obrazek
	if (bare === true) {
		return <NativeImage source={{ uri }} resizeMode="contain" style={style as StyleProp<ImageStyle>} />;
	}
	// sestaveni a vraceni
	return (
		<View style={[styles.wrapper, style]}>
			<NativeImage source={{ uri }} resizeMode="contain" style={styles.image} />
		</View>
	);
};

// export
export default Image;
