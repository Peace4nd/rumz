import React, { ReactElement } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
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
			<FlatList
				data={React.Children.toArray(children)}
				horizontal={false}
				scrollEnabled={true}
				renderItem={this.renderRecord}
				ItemSeparatorComponent={() => <View style={styles.fieldRowGap} />}
			/>
		);
	}

	/**
	 * Sestaveni polozky seznamu
	 *
	 * @param {ListRenderItemInfo<ReactElement>} params Parametry
	 * @returns {ReactElement} Element polozky
	 */
	private renderRecord = ({ item }: ListRenderItemInfo<ReactElement>): ReactElement => {
		return item;
	};
}
