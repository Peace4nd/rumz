import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

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
		alignItems: "center",
		flex: 0,
		flexDirection: "row",
		height: Size["4x"],
		justifyContent: "space-between"
	},
	infoManufacturer: {
		flex: 1,
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
		flexDirection: "row",
		justifyContent: "center",
		padding: Measurement.Padding
	},
	infoPortionsIcon: {
		marginRight: Measurement.Padding
	},
	infoRipening: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center"
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
		backgroundColor: Color.White,
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 4,
		flex: 1,
		flexDirection: "row",
		height: Measurement.Components.Collection.Height,
		margin: Measurement.Padding,
		overflow: "hidden",
		padding: Measurement.Padding
	},
	itemWrapperPressed: {
		opacity: 0.2
	},
	wrapper: {}
});

export default styles;
