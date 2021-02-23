import { StyleSheet } from "react-native";
import { Size } from "../../styles";

const styles = StyleSheet.create({
	columnBase: {
		backgroundColor: "orange",
		flex: 0,
		flexDirection: "column"
	},
	columnEvenly: {
		flex: 1
	},
	columnGap: {
		marginLeft: Size["2x"]
	},
	rowBase: {
		backgroundColor: "yellow",
		flex: 0,
		flexDirection: "row",
		width: "100%"
	},
	rowGap: {
		marginBottom: Size["2x"]
	},
	wrapper: {
		backgroundColor: "pink",
		flex: 0,
		flexDirection: "column"
	}
});

export default styles;
