import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment from "moment";
import React from "react";
import { FlatList, Image, ListRenderItemInfo, TouchableOpacity, View } from "react-native";
import { Measurement } from "../../styles";
import { ICollectionRecord } from "../../types/collection";
import strings from "../../utils/strings";
import Country from "../country";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface ICollection {
	records: ICollectionRecord[];
	onClick: (record: ICollectionRecord) => void;
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
		onClick: null,
		records: []
	};

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
				numColumns={2}
				scrollEnabled={true}
				renderItem={this.renderRecord}
				ItemSeparatorComponent={() => <View style={styles.itemWrapperGapRow} />}
				keyExtractor={(item) => item.id}
				columnWrapperStyle={styles.itemContainer}
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
	private renderRecord = ({ index, item }: ListRenderItemInfo<ICollectionRecord>): JSX.Element => {
		// rozlozeni props
		const { onClick } = this.props;
		// sestaveni a vraceni
		return (
			<View key={index} style={[styles.itemWrapper, index % 2 === 0 && index < this.props.records.length - 1 ? styles.itemWrapperGapColumn : null]}>
				<TouchableOpacity style={styles.itemLink} onPress={() => onClick(item)}>
					<Image source={{ uri: item.images[0] }} resizeMode="contain" style={styles.itemImage} />
					<View style={styles.infoWrapper}>
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
				</TouchableOpacity>
			</View>
		);
	};
}
