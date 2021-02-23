import React, { ReactElement } from "react";
import { View } from "react-native";
import { IGridHidden } from "..";
import styles from "../styles";
import { IGridRow } from "./row";

/**
 * Dostupne vlastnosti
 */
export interface IGridWrapper {
	gap?: boolean;
	children: ReactElement<IGridRow> | Array<ReactElement<IGridRow>>;
}

/**
 * Wrapper
 */
export default class GridWrapper extends React.PureComponent<IGridWrapper> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IGridWrapper = {
		children: null,
		gap: true
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children, gap } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				{React.Children.map(children, (child, rowIndex) => {
					return React.cloneElement(child as any, { gap, index: rowIndex } as IGridRow & IGridHidden);
				})}
			</View>
		);
	}
}
