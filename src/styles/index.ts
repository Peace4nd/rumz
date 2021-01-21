import { StyleSheet } from "react-native";

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
	Primary: {
		Base: "#546e7a",
		Dark: "#29434e",
		Light: "#819ca9",
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
 * Zpruhledneni barvy
 *
 * @param {string} color Barva
 * @param {number} opacity Mira pruhlednosti
 * @returns {string} Pruhledna barva
 */
export function opacify(color: string, opacity: number): string {
	return color + Math.round(255 * opacity).toString(16);
}
