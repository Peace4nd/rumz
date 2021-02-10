import { faGlassWhiskey, faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FlatList, Image, ListRenderItemInfo, TouchableOpacity, View } from "react-native";
import { Country, Icon } from "..";
import { Color, Measurement } from "../../styles";
import { ICollectionRecord } from "../../types/collection";
import strings from "../../utils/strings";
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
export default class Collection extends React.PureComponent<ICollection> {
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
					<Icon icon={faListUl} size={Measurement.Icon * 3} color={Color.Muted} />
					<Typography type="Headline4" style={styles.emptyText}>
						{strings("overviewEmpty")}
					</Typography>
				</View>
			);
		}
		// sestaveni a vraceni
		return <FlatList data={records} scrollEnabled={true} renderItem={this.renderRecord} keyExtractor={(item) => item.id} style={styles.wrapper} />;
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
			<TouchableOpacity key={index} style={styles.itemWrapper} onPress={() => onClick(item)}>
				<Image source={{ uri: item.image.path }} resizeMode="contain" style={styles.itemImage} />
				<View style={styles.itemInfo}>
					<Typography type="Headline6" style={styles.infoName}>
						{item.name}
					</Typography>
					<Typography type="Body1" style={styles.infoManufacturer}>
						{item.manufacturer}
					</Typography>
					<View style={styles.infoAdditional}>
						<Country.Flag code={item.origin} />
						{/* <Typography type="Subtitle2" style={styles.infoAdditionalDate}>
							{moment(item.purchased).format("D. M. YYYY")}
						</Typography>
						*/}
						<View style={styles.infoPortions}>
							<Icon icon={faGlassWhiskey} size={Measurement.Icon / 2} style={styles.infoPortionsIcon} />
							<Typography type="Body2">2x</Typography>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	};
}
