import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import confirm from "../../utils/confirm";
import Icon from "../icon";
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
	 * Smazani
	 */
	onDelete?: (tag: string) => void;

	/**
	 * Editace
	 */
	onModify?: (tag: string) => void;
}

/**
 * Tagy
 *
 * @param {ITags} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Tags = (props: ITags): JSX.Element => {
	// rozlozeni props
	const { items, onDelete, onModify } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			{items.map((item, index) => (
				<View key={index} style={styles.item}>
					<Typography type="Body1" style={styles.label}>
						{item}
					</Typography>
					{onDelete && (
						<TouchableOpacity
							onPress={confirm.delete({
								onConfirm: () => {
									onDelete(item);
								}
							})}
						>
							<Icon definition={faTrash} />
						</TouchableOpacity>
					)}
					{onModify && (
						<TouchableOpacity onPress={() => onModify(item)}>
							<Icon definition={faPencilAlt} />
						</TouchableOpacity>
					)}
				</View>
			))}
		</View>
	);
};

export default Tags;
