import React from "react";
import { TouchableOpacity, View } from "react-native";
import confirm from "../../utils/confirm";
import Typography from "../typography";
import styles from "./styles";
export interface ITagsItem {
	value: string;
	label: string;
	color: string;
}

/**
 * Dostupne vlastnosti
 */
export interface ITags {
	/**
	 * Polozky
	 */
	items: string[];

	/**
	 * Stistnuti
	 */
	onPress: (tag: string) => void;

	/**
	 * Dlouhe stisknuti
	 */
	onLongPress?: (tag: string) => void;
}

/**
 * Tagy
 *
 * @param {ITags} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Tags = (props: ITags): JSX.Element => {
	// rozlozeni props
	const { items, onLongPress, onPress } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			{items.map((item, index) => (
				<TouchableOpacity
					key={index}
					style={styles.item}
					onPress={confirm.delete({
						onConfirm: () => {
							onPress(item);
						}
					})}
					onLongPress={() => {
						if (typeof onLongPress === "function") {
							onLongPress(item);
						}
					}}
				>
					<Typography type="Body1" style={styles.label}>
						{item}
					</Typography>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Tags;
