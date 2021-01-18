import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { Color, Size, Typography } from "../../styles";

export const styles = StyleSheet.create({
	back: {
		paddingRight: Size["2x"]
	},
	icon: {
		color: Color.Primary.Text
	},
	title: {
		...Typography.Headline6,
		color: Color.Primary.Text
	},
	wrapper: {
		alignItems: "center",
		backgroundColor: Color.Primary.Base,
		flexDirection: "row",
		height: Size["6x"],
		justifyContent: "flex-start",
		paddingHorizontal: Size["1x"]
	}
});

class Header extends React.Component<RouteComponentProps> {
	public render(): JSX.Element {
		return (
			<View style={styles.wrapper}>
				<TouchableOpacity onPress={this.handlePress} style={styles.back}>
					<FontAwesomeIcon icon={faChevronLeft} style={styles.icon} size={24} />
				</TouchableOpacity>

				<Text style={styles.title}>RUMZ</Text>
			</View>
		);
	}

	private handlePress = (): void => {
		this.props.history.goBack();
	};
}

export default withRouter(Header);
