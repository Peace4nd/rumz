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
	 * Velikost panaku
	 */
	dram: number;

	/**
	 * Kompleni zaznam
	 */
	complete: boolean;

	/**
	 * Stisknuti
	 */
	onPress: (record: IDataCollection) => void;
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
		complete: false,
		dram: 0,
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
		const { complete, dram, onPress, record } = this.props;
		// priprava zrani
		const ripening = format.range(record.ripening, strings("overviewRipeningYears"));
		// sestaveni a vraceni
		return (
			<Pressable style={({ pressed }) => [styles.wrapper, pressed ? styles.wrapperPressed : null]} onPress={() => onPress(record)}>
				<Image source={record.image} grayscale={record.volume - record.drunk <= 0} bare={true} style={styles.image} />
				<View style={styles.info}>
					<Typography type="Headline6" style={styles.infoName}>
						{record.name}
					</Typography>
					{!!record.subname && (
						<Typography type="Subtitle2" style={styles.infoSubname}>
							{record.subname}
						</Typography>
					)}
					<Typography type="Body1" style={styles.infoManufacturer}>
						{record.manufacturer}
					</Typography>
					<View style={styles.infoAdditional}>
						<CountryFlag code={record.origin} />
						<View style={styles.infoRipening}>
							<Typography type="Body2">{ripening.empty ? null : ripening.value}</Typography>
						</View>
						<View style={styles.infoPortions}>
							<Icon definition={faGlassWhiskey} size="2x" style={styles.infoPortionsIcon} />
							<Typography type="Body2">{Math.ceil((record.volume - record.drunk) / dram)}x</Typography>
						</View>
					</View>
				</View>
				<View style={[styles.status, complete ? styles.statusComplete : styles.statusIncomplete]} />
			</Pressable>
		);
	}
}
