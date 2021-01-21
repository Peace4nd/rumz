import { StyleSheet } from "react-native";
import { Color, opacify, Typography } from "../../styles";

export const GRID_COLUMNS: number = 2;
export const GRID_GAP_WRAPPER: number = 5;
export const GRID_GAP_ITEM: number = 10;
export const GRID_BORDER: number = 1;

export const styles = StyleSheet.create({
	infoAdditional: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	infoAdditionalDate: {
		...Typography.Subtitle2,
		color: Color.Primary.Text
	},
	infoAdditionalFlag: {
		width: 24
	},
	infoLabel: {
		...Typography.Subtitle1,
		color: Color.Primary.Text,
		paddingBottom: 4
	},
	infoWrapper: {
		backgroundColor: opacify(Color.Primary.Base, 0.75),
		bottom: -GRID_GAP_ITEM,
		flexDirection: "column",
		left: -GRID_GAP_ITEM,
		padding: 4,
		position: "absolute",
		right: -GRID_GAP_ITEM
	},
	itemImage: {
		flex: 1
	},
	itemLink: {
		flex: 1
	},
	itemWrapper: {
		borderColor: opacify(Color.Primary.Base, 0.75),
		borderRadius: 5,
		borderWidth: GRID_BORDER,
		margin: GRID_GAP_ITEM,
		padding: GRID_GAP_ITEM
	},
	wrapper: {
		paddingHorizontal: GRID_GAP_WRAPPER
	}
});

export default styles;
