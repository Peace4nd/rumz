import { StyleSheet } from "react-native";
import { Color, Measurement, opacify } from "../../styles";

const styles = StyleSheet.create({
	emptyIcon: {
		color: Color.Primary.Muted
	},
	emptyText: {
		color: Color.Primary.Muted,
		marginTop: Measurement.Padding * 3
	},
	emptyWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	infoAdditional: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	infoAdditionalDate: {
		color: Color.Primary.Text
	},
	infoLabel: {
		color: Color.Primary.Text,
		paddingBottom: Measurement.Padding / 2
	},
	infoWrapper: {
		backgroundColor: opacify(Color.Primary.Base, 0.75),
		bottom: -StyleSheet.hairlineWidth,
		flexDirection: "column",
		left: -StyleSheet.hairlineWidth,
		padding: Measurement.Padding,
		position: "absolute",
		right: -StyleSheet.hairlineWidth
	},
	itemContainer: {
		justifyContent: "center"
	},
	itemImage: {
		flex: 1,
		margin: Measurement.Padding
	},
	itemLink: {
		flex: 1
	},
	itemWrapper: {
		aspectRatio: 1,
		backgroundColor: Color.White,
		borderColor: opacify(Color.Primary.Base, 0.75),
		borderRadius: 5,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 4,
		flex: 1,
		flexBasis: "50%",
		flexGrow: 0,
		flexShrink: 1,
		overflow: "hidden"
	},
	itemWrapperGapColumn: {
		marginRight: 2 * Measurement.Padding
	},
	itemWrapperGapRow: {
		flex: 1,
		height: 2 * Measurement.Padding
	},
	wrapper: {}
});

export default styles;
