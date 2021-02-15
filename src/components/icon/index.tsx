import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Color, Size } from "../../styles";

/**
 * Dostupne vlastnosti
 */
export interface IIcon {
	/**
	 * Definice
	 */
	definition: IconProp;

	/**
	 * Velikost
	 */
	size?: keyof typeof Size;

	/**
	 * Barva
	 */
	color?: keyof typeof Color;

	/**
	 * Doplnkove styly
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * Ikona
 *
 * @param {Props} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Icon = (props: IIcon): JSX.Element => {
	// rozlozeni props
	const { color, definition, size, style } = props;
	// sestaveni a vraceni
	return <FontAwesomeIcon icon={definition} size={Size[size || "3x"]} color={Color[color || "Text"]} style={style} />;
};

// export
export default Icon;
