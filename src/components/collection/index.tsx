import { faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { CountryFlag, Icon } from "..";
import { IDataCollection } from "../../types/data";
import format from "../../utils/format";
import strings from "../../utils/strings";
import Image from "../image";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface ICollection {
	/**
	 * Zaznamy kolekce
	 */
	record: IDataCollection;

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
		record: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { dram, onLongPress, onPress, record } = this.props;
		// sestaveni a vraceni
		return (
			<Pressable
				style={({ pressed }) => [styles.wrapper, pressed ? styles.wrapperPressed : null]}
				onPress={() => onPress(record)}
				onLongPress={() => onLongPress(record)}
			>
				<Image source={record.image} bare={true} style={styles.image} />
				<View style={styles.info}>
					<Typography type="Headline6" style={styles.infoName}>
						{record.name}
					</Typography>
					<Typography type="Body1" style={styles.infoManufacturer}>
						{record.manufacturer}
					</Typography>
					<View style={styles.infoAdditional}>
						<CountryFlag code={record.origin} />
						<View style={styles.infoRipening}>
							<Typography type="Body2">{format.range(record.ripening, strings("overviewRipeningYears"))}</Typography>
						</View>
						<View style={styles.infoPortions}>
							<Icon definition={faGlassWhiskey} size="2x" style={styles.infoPortionsIcon} />
							<Typography type="Body2">{dram}x</Typography>
						</View>
					</View>
				</View>
			</Pressable>
		);
	}
}
