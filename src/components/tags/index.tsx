import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Typography from "../typography";
import styles from "./styles";

export interface ITagsItem {
	value: string;
	label: string;
	color: string;
}

export interface ITags {
	items: string[];
	onPress: (tag: string) => void;
}

/**
 * Tagy
 *
 * @param {ITags} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Icon = (props: ITags): JSX.Element => {
	// rozlozeni props
	const { items, onPress } = props;
	// sestaveni a vraceni

	return (
		<View style={styles.wrapper}>
			{items.map((item, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => {
						Alert.alert(
							"smazat jo?",
							"lorem ipsum dolit sit amet",
							[
								{
									onPress: () => {
										onPress(item);
									},
									text: "jarp"
								},
								{ text: "narp" }
							],
							{
								cancelable: false
							}
						);
					}}
				>
					<Typography type="Body1" style={styles.item}>
						{item}
					</Typography>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Icon;
