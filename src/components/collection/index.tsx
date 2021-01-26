import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment from "moment";
import React from "react";
import { Dimensions, FlatList, ImageBackground, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";
import { Link } from "react-router-native";
import { Measurement } from "../../styles";
import { ICollectionRecord } from "../../types/collection";
import { preparePath } from "../../utils/router";
import strings from "../../utils/strings";
import Country from "../country";
import Typography from "../typography";
import styles, { GRID_COLUMNS, GRID_GAP_ITEM, GRID_GAP_WRAPPER } from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface ICollection {
	records: ICollectionRecord[];
}

/**
 * Sbirka
 *
 * @returns {JSX.Element} Element
 */
export default class Collection extends React.Component<ICollection> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: ICollection = {
		records: []
	};

	/**
	 * Velikost jedne polozky
	 */
	private readonly itemSize = this.calculateRecordSize();

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { records } = this.props;
		// prazdna kolekce
		if (records.length === 0) {
			return (
				<View style={styles.emptyWrapper}>
					<FontAwesomeIcon icon={faListUl} size={Measurement.Icon * 3} style={styles.emptyIcon} />
					<Typography type="Headline4" style={styles.emptyText}>
						{strings("overviewEmpty")}
					</Typography>
				</View>
			);
		}
		// sestaveni a vraceni
		return (
			<FlatList
				data={records}
				numColumns={GRID_COLUMNS}
				scrollEnabled={true}
				renderItem={this.renderRecord}
				keyExtractor={(item) => item.id}
				style={styles.wrapper}
			/>
		);
	}

	/**
	 * Sestaveni polozky seznamu
	 *
	 * @param {ListRenderItemInfo<ICollectionRecord>} params Parametry
	 * @returns {JSX.Element} Element polozky
	 */
	private renderRecord = ({ index, item }: ListRenderItemInfo<ICollectionRecord>): JSX.Element => (
		<View key={index} style={StyleSheet.flatten([styles.itemWrapper, { height: this.itemSize, width: this.itemSize }])}>
			<Link to={preparePath("/overview/:id", { id: item.id })} style={styles.itemLink} component={TouchableOpacity}>
				<ImageBackground source={{ uri: item.images[0] }} resizeMode="contain" style={styles.itemImage}>
					<View style={StyleSheet.flatten([styles.infoWrapper, { width: this.itemSize - 2 * StyleSheet.hairlineWidth }])}>
						<Typography type="Subtitle1" style={styles.infoLabel}>
							{item.name}
						</Typography>
						<View style={styles.infoAdditional}>
							<Typography type="Subtitle2" style={styles.infoAdditionalDate}>
								{moment(item.purchased).format("D. M. YYYY")}
							</Typography>
							<Country.Flag code={item.origin} />
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
	private calculateRecordSize(): number {
		// rozlozeni vlastnosti
		const { width } = Dimensions.get("window");
		// vypocet a vraceni
		return (width - (2 * GRID_GAP_WRAPPER + 4 * GRID_GAP_ITEM + 4 * StyleSheet.hairlineWidth)) / GRID_COLUMNS;
	}
}
