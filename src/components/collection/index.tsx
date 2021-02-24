import { faGlassWhiskey, faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FlatList, Image, ListRenderItemInfo, Pressable, View } from "react-native";
import { CountryFlag, Icon } from "..";
import { IDataCollection } from "../../types/data";
import strings from "../../utils/strings";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface ICollection {
	/**
	 * Zaznamy kolekce
	 */
	records: IDataCollection[];

	/**
	 * Panak
	 */
	dram: number;

	/**
	 * Stisknuti
	 */
	onPress: (record: IDataCollection) => void;

	/**
	 * Dlouhe stisknuti
	 */
	onLongPress: (record: IDataCollection) => void;
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
		dram: 0,
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
					<Icon definition={faListUl} size="9x" color="Muted" />
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
	 * @param {ListRenderItemInfo<IDataCollection>} params Parametry
	 * @returns {JSX.Element} Element polozky
	 */
	private renderRecord = ({ index, item }: ListRenderItemInfo<IDataCollection>): JSX.Element => {
		// rozlozeni props
		const { dram, onLongPress, onPress } = this.props;
		// sestaveni a vraceni
		return (
			<Pressable
				key={index}
				style={({ pressed }) => [styles.itemWrapper, pressed ? styles.itemWrapperPressed : null]}
				onPress={() => onPress(item)}
				onLongPress={() => onLongPress(item)}
			>
				<Image source={{ uri: "file://" + item.image }} resizeMode="contain" style={styles.itemImage} />
				<View style={styles.itemInfo}>
					<Typography type="Headline6" style={styles.infoName}>
						{item.name}
					</Typography>
					<Typography type="Body1" style={styles.infoManufacturer}>
						{item.manufacturer}
					</Typography>
					<View style={styles.infoAdditional}>
						<CountryFlag code={item.origin} />
						<View style={styles.infoRipening}>{this.renderRipening(item)}</View>
						<View style={styles.infoPortions}>
							<Icon definition={faGlassWhiskey} size="2x" style={styles.infoPortionsIcon} />
							<Typography type="Body2">{Math.ceil((item.volume - item.drunk * dram) / dram)}x</Typography>
						</View>
					</View>
				</View>
			</Pressable>
		);
	};

	/**
	 * Zrani
	 *
	 * @param {IDataCollection} item Polozka kolekce
	 * @returns {JSX.Element} Element polozky
	 */
	private renderRipening(item: IDataCollection): JSX.Element {
		if (item.ripening[0] && item.ripening[1]) {
			return (
				<Typography>
					{item.ripening[0]} - {item.ripening[1]} {strings("overviewRipeningYears")}
				</Typography>
			);
		} else {
			if (item.ripening[0]) {
				return (
					<Typography>
						&gt; {item.ripening[0]} {strings("overviewRipeningYears")}
					</Typography>
				);
			} else {
				return (
					<Typography>
						&lt; {item.ripening[1]} {strings("overviewRipeningYears")}
					</Typography>
				);
			}
		}
	}
}
