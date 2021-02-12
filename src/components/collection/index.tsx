import { faGlassWhiskey, faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FlatList, Image, ListRenderItemInfo, Pressable, View } from "react-native";
import { CountryFlag, Icon } from "..";
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
	onPress: (record: ICollectionRecord) => void;
	onLongPress: (record: ICollectionRecord) => void;
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
		onLongPress: null,
		onPress: null,
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
		const { onLongPress, onPress } = this.props;
		// sestaveni a vraceni
		return (
			<Pressable
				key={index}
				style={({ pressed }) => [styles.itemWrapper, pressed ? styles.itemWrapperPressed : null]}
				onPress={() => onPress(item)}
				onLongPress={() => onLongPress(item)}
			>
				<Image source={{ uri: item.image.path }} resizeMode="contain" style={styles.itemImage} />
				<View style={styles.itemInfo}>
					<Typography type="Headline6" style={styles.infoName}>
						{item.name}
					</Typography>
					<Typography type="Body1" style={styles.infoManufacturer}>
						{item.manufacturer}
					</Typography>
					<View style={styles.infoAdditional}>
						<CountryFlag code={item.origin} />
						<View style={styles.infoPortions}>
							<Icon icon={faGlassWhiskey} size={Measurement.Icon / 2} style={styles.infoPortionsIcon} />
							{/* TODO: 40 je konfigurovatelna hodnota, ktera bude ulozena nekde ve storu */}
							<Typography type="Body2">{Math.ceil((item.volume - item.drunk * 40) / 40)}x</Typography>
						</View>
					</View>
				</View>
			</Pressable>
		);
	};
}
