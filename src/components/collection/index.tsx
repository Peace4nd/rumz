import { Moment } from "moment";
import React from "react";
import { Dimensions, FlatList, ImageBackground, ImageSourcePropType, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "react-router-native";
import { Country } from "..";
import { Color, opacify, Size, Typography } from "../../styles";

export interface ICollectionItem {
	id: string;
	source: ImageSourcePropType;
	label: string;
	added: Moment;
	country: string;
}

export interface ICollection {
	items: ICollectionItem[];
}

const GRID_COLUMNS: number = 2;
const GRID_GAP_WRAPPER: number = 5;
const GRID_GAP_ITEM: number = 10;
const GRID_BORDER: number = 1;

export const styles = StyleSheet.create({
	infoAdditional: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	infoAdditionalDate: {
		...Typography.Subtitle2,
		color: Color.Primary.Text
	},
	infoAdditionalFlag: {
		width: Size["3x"]
	},
	infoLabel: {
		...Typography.Subtitle1,
		color: Color.Primary.Text,
		paddingBottom: Size["1x"] / 2
	},
	infoWrapper: {
		backgroundColor: opacify(Color.Primary.Base, 0.75),
		bottom: -GRID_GAP_ITEM,
		flexDirection: "column",
		left: -GRID_GAP_ITEM,
		padding: Size["1x"] / 2,
		position: "absolute",
		right: -GRID_GAP_ITEM
	},
	itemImage: {
		flex: 1
	},
	itemLink: {
		flex: 1
	},
	itemWrapper: {
		borderColor: opacify(Color.Primary.Base, 0.75),
		borderRadius: 5,
		borderWidth: GRID_BORDER,
		margin: GRID_GAP_ITEM,
		padding: GRID_GAP_ITEM
	},
	wrapper: {
		paddingHorizontal: GRID_GAP_WRAPPER
	}
});

export default class Collection extends React.Component<ICollection> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: ICollection = {
		items: []
	};

	/**
	 * Velikost jedne polozky
	 */
	private readonly itemSize = this.calculateItemSize();

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { items } = this.props;
		// sestaveni a vraceni
		return (
			<FlatList
				data={items}
				numColumns={GRID_COLUMNS}
				scrollEnabled={true}
				renderItem={this.renderItem}
				keyExtractor={(item) => item.label}
				style={styles.wrapper}
			/>
		);
	}

	/**
	 * Sestaveni polozky seznamu
	 *
	 * @param {ListRenderItemInfo<ICollectionItem>} params Parametry
	 * @returns {JSX.Element} Element polozky
	 */
	private renderItem = ({ index, item }: ListRenderItemInfo<ICollectionItem>): JSX.Element => (
		<View key={index} style={StyleSheet.flatten([styles.itemWrapper, { height: this.itemSize, width: this.itemSize }])}>
			<Link to={"/view/" + item.id} style={styles.itemLink} component={TouchableOpacity}>
				<ImageBackground source={item.source} resizeMode="contain" style={styles.itemImage}>
					<View style={StyleSheet.flatten([styles.infoWrapper, { width: this.itemSize - 2 * GRID_BORDER }])}>
						<Text style={styles.infoLabel}>{item.label}</Text>
						<View style={styles.infoAdditional}>
							<Text style={styles.infoAdditionalDate}>{item.added.format("D. M. YYYY")}</Text>
							<Country.Flag code={item.country} style={styles.infoAdditionalFlag} />
						</View>
					</View>
				</ImageBackground>
			</Link>
		</View>
	);

	/**
	 * Vypocet velikosti polozky
	 *
	 * @returns {number} Velikost polozky
	 */
	private calculateItemSize(): number {
		// rozlozeni vlastnosti
		const { width } = Dimensions.get("window");
		// vypocet a vraceni
		return (width - (2 * GRID_GAP_WRAPPER + 4 * GRID_GAP_ITEM + 4 * GRID_BORDER)) / GRID_COLUMNS;
	}
}
