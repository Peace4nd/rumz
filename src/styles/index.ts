import { StyleSheet } from "react-native";

// utility
export * from "./utils";

/**
 * Typografie
 */
export const Typography = StyleSheet.create({
	Body1: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 16,
		letterSpacing: 0.5
	},
	Body2: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 14,
		letterSpacing: 0.25
	},
	Button: {
		fontFamily: "Ubuntu-Medium",
		fontSize: 14,
		letterSpacing: 1.25
	},
	Caption: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 12,
		letterSpacing: 0.4
	},
	Headline1: {
		fontFamily: "Ubuntu-Light",
		fontSize: 96,
		letterSpacing: -1.5
	},
	Headline2: {
		fontFamily: "Ubuntu-Light",
		fontSize: 60,
		letterSpacing: -0.5
	},
	Headline3: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 48,
		letterSpacing: 0
	},
	Headline4: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 34,
		letterSpacing: 0.25
	},
	Headline5: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 24,
		letterSpacing: 0
	},
	Headline6: {
		fontFamily: "Ubuntu-Medium",
		fontSize: 20,
		letterSpacing: 0.15
	},
	Overline: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 10,
		letterSpacing: 1.5
	},
	Subtitle1: {
		fontFamily: "Ubuntu-Regular",
		fontSize: 16,
		letterSpacing: 0.15
	},
	Subtitle2: {
		fontFamily: "Ubuntu-Medium",
		fontSize: 14,
		letterSpacing: 0.1
	}
});

/**
 * Barvy
 */
export const Color = {
	Black: "#000000",
	Primary: {
		Base: "#546e7a",
		Dark: "#29434e",
		Light: "#819ca9",
		Muted: "#aaaaaa",
		Text: "#fafafa"
	},
	Secondary: {
		Base: "#ffd54f",
		Dark: "#c8a415",
		Light: "#ffff81",
		Text: "#212121"
	},
	White: "#ffffff"
};

/**
 * Zakladni rozmery
 */
export const Measurement = {
	Button: 48,
	Header: 48,
	Icon: 24,
	Input: 48,
	Navigation: 80,
	Padding: 8,
	Radius: 8
};
