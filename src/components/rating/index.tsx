import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Color, Measurement } from "../../styles";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IRating {
	/**
	 * Hodnota
	 */
	value: number;

	/**
	 * Zmena
	 */
	onChange?: (value: number) => void;
}

/**
 * Hodnoceni
 *
 * @returns {JSX.Element} Element
 */
export default class Rating extends React.PureComponent<IRating> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IRating = {
		onChange: null,
		value: 0
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { onChange, value } = this.props;
		// definice
		const stars: JSX.Element[] = [];
		// sestaveni
		for (let i = 0; i < 10; i++) {
			stars.push(
				<TouchableOpacity key={i} onPress={() => onChange(i + 1)}>
					<FontAwesomeIcon style={styles.star} icon={faStar} color={value > i ? Color.Secondary.Base : Color.Primary.Light} size={Measurement.Icon} />
				</TouchableOpacity>
			);
		}
		// vraceni
		return <View style={styles.wrapper}>{stars}</View>;
	}
}
