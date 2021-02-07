import { StyleSheet } from "react-native";
import { Color } from "../../styles";

const styles = StyleSheet.create({
	star: {
		color: Color.Secondary.Base
	},
	wrapper: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

export default styles;
