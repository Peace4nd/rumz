import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	emptyText: {
		color: Color.Muted,
		marginTop: Measurement.Padding * 3
	},
	emptyWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	infoAdditional: {
		flex: 1,
		justifyContent: "flex-end"
	},
	infoManufacturer: {
		flex: 0,
		marginBottom: Measurement.Padding / 2
	},
	infoName: {
		flex: 0,
		fontWeight: "bold",
		marginBottom: Measurement.Padding / 2
	},
	infoPortions: {
		alignItems: "center",
		backgroundColor: Color.Light,
		borderRadius: Measurement.Radius / 2,
		bottom: 0,
		flexDirection: "row",
		justifyContent: "center",
		padding: Measurement.Padding,
		position: "absolute",
		right: 0
	},
	infoPortionsIcon: {
		marginRight: Measurement.Padding
	},
	itemImage: {
		aspectRatio: 1,
		flex: 0,
		height: "100%"
	},
	itemInfo: {
		flex: 1,
		flexDirection: "column",
		padding: Measurement.Padding
	},
	itemWrapper: {
		backgroundColor: Color.Highlight,
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 4,
		flex: 1,
		flexDirection: "row",
		height: Measurement.Components.Collection.Height,
		margin: Measurement.Padding,
		marginBottom: Measurement.Padding * 2,
		overflow: "hidden",
		padding: Measurement.Padding
	},
	itemWrapperPressed: {
		opacity: 0.2
	},
	wrapper: {}
});

export default styles;
