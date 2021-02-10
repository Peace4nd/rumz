import { FontAwesomeIcon, Props } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Color, Measurement } from "../../styles";

/**
 * Ikona
 *
 * @param {Props} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Icon = (props: Props): JSX.Element => {
	// rozlozeni props
	const { color, size, ...rest } = props;
	// sestaveni a vraceni
	return <FontAwesomeIcon {...rest} size={size || Measurement.Icon} color={color || Color.Text} />;
};

export default Icon;
