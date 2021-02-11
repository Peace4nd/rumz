import React from "react";
import { ActivityIndicator } from "react-native";
import { Color } from "../../styles";

/**
 * Dostupne vlasnosti
 */
interface ILoading {
	/**
	 * Velikost
	 */
	size?: "small" | "large";
}

/**
 * Nacitani
 *
 * @param {ILoading} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Loading = (props: ILoading): JSX.Element => {
	// rozlozeni props
	const { size } = props;
	// sestaveni a vraceni
	return <ActivityIndicator size={size || "large"} color={Color.Base} />;
};

export default Loading;
