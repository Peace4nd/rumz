import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";

/**
 * Formular
 *
 * @returns {JSX.Element} Element
 */
export default class Form extends React.Component<unknown> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children } = this.props;
		// sestaveni a vraceni
		return (
			<ScrollView keyboardDismissMode="on-drag" style={styles.wrapper}>
				{React.Children.map(children, (child, index) => {
					return (
						<React.Fragment>
							{index > 0 && <View style={styles.rowGap} />}
							{child}
						</React.Fragment>
					);
				})}
			</ScrollView>
		);
	}
}
