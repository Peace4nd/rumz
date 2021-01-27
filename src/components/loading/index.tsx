import React from "react";
import { Animated, Easing, View } from "react-native";
import styles from "./styles";

/**
 * Nacitani
 *
 * @returns {JSX.Element} Element
 */
const Load = (): JSX.Element => {
	// definice animovane hodnoty
	const spinValue = new Animated.Value(0);
	// definice animace
	Animated.loop(
		Animated.timing(spinValue, {
			duration: 1500,
			easing: Easing.linear,
			toValue: 1,
			useNativeDriver: true
		})
	).start();
	// priprava interpolace animovane hodnoty
	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"]
	});
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			<Animated.View style={[styles.indicator, { transform: [{ rotate: spin }] }]} />
		</View>
	);
};

export default Load;
