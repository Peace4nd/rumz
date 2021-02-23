import React, { ReactNode, ReactNodeArray } from "react";
import { View } from "react-native";
import { IGridHidden } from "..";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IGridColumn {
	children: ReactNode | ReactNodeArray;
	evenly?: boolean;
	// misto evenly mozan ddat flex:number
}

/**
 * Sloupec
 */
export default class GridColumn extends React.PureComponent<IGridColumn> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IGridColumn = {
		children: null,
		evenly: true
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { evenly, children, gap, index } = this.props as IGridColumn & IGridHidden;
		// sestaveni a vraceni
		return <View style={[styles.columnBase, gap && index > 0 ? styles.columnGap : null, evenly ? styles.columnEvenly : null]}>{children}</View>;
	}
}
