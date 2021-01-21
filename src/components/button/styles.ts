import { StyleSheet } from "react-native";
import { Color } from "../../styles";

export const styles = StyleSheet.create({
	base: {
		alignItems: "center",
		backgroundColor: Color.Secondary.Base,
		borderRadius: 24,
		elevation: 6,
		flex: 1,
		justifyContent: "center"
	},
	icon: {
		color: Color.Secondary.Text
	},
	wrapper: {
		bottom: 24,
		height: 48,
		position: "absolute",
		right: 24,
		width: 48
	}
});

export default styles;
