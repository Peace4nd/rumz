/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	faCheck,
	faCircle,
	faComments,
	faEuroSign,
	faGlobeAmericas,
	faIndustry,
	faPalette,
	faPencilAlt,
	faPercentage,
	faStarHalfAlt,
	faWineBottle
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Input, Loading } from "../../components";
import { IHeader } from "../../components/header";
import { ICollectionRecord } from "../../types/collection";
import country from "../../utils/country";
import { RouterPath } from "../../utils/router";
import { collection } from "../../utils/storage";
import strings from "../../utils/strings";
import BaseRoute from "../base";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 16
	}
});

interface IAddState {
	record: ICollectionRecord;
	saving: boolean;
}

/**
 * Pridani
 */
export default class Add extends BaseRoute<unknown, IAddState> {
	/**
	 * Vychozi stav
	 */
	public state: IAddState = {
		record: {
			alcohol: null,
			color: null,
			id: uuidv4(),
			images: null,
			manufacturer: null,
			name: null,
			notes: null,
			origin: null,
			price: null,
			purchased: new Date(),
			rating: null,
			ripening: null,
			smell: null,
			taste: null,
			volume: null
		},
		saving: false
	};

	/**
	 * Vlastni obsah routy
	 *
	 * @returns {JSX.Element} Element
	 */
	protected setHeaderProps(): IHeader {
		return {
			actions: [
				{
					disabled: this.state.saving,
					icon: faCheck,
					onPress: (history) => {
						this.setState(
							{
								saving: true
							},
							() => {
								collection.push(this.state.record).then(() => {
									history.push(RouterPath["/overview"]);
								});
							}
						);
					}
				}
			],
			title: strings("headerAdd")
		};
	}

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	protected renderRoute(): JSX.Element {
		// rozlozeni props
		const { record, saving } = this.state;
		// zpracovani
		if (saving) {
			return <Loading />;
		}
		// sestaveni a vraceni
		return (
			<ScrollView contentContainerStyle={styles.container}>
				{/* obrazek */}
				<Input.Image onChange={(value) => console.log(value)} />
				{/* nazev */}
				<Input.Text icon={faPencilAlt} value={record.name} placeholder={strings("createName")} onChange={this.handleChange.bind(this, "name")} />
				{/* vyrobce */}
				<Input.Text
					icon={faIndustry}
					value={record.manufacturer}
					placeholder={strings("createManufacturer")}
					onChange={this.handleChange.bind(this, "manufacturer")}
				/>
				{/* objem lahve */}
				<Input.Number
					icon={faWineBottle}
					value={record.volume}
					placeholder={strings("createVolume")}
					onChange={this.handleChange.bind(this, "volume")}
				/>
				{/* obsah alkoholu */}
				<Input.Number
					icon={faPercentage}
					value={record.alcohol}
					placeholder={strings("createAlcohol")}
					onChange={this.handleChange.bind(this, "alcohol")}
				/>
				{/* barva */}
				<Input.Multiline
					icon={faPalette}
					value={record.color}
					placeholder={strings("createCharacteristicsColor")}
					lines={2}
					onChange={this.handleChange.bind(this, "color")}
				/>
				{/* cichova charakteristika */}
				<Input.Multiline
					icon={faCircle}
					value={record.smell}
					placeholder={strings("createCharacteristicsSmell")}
					lines={2}
					onChange={this.handleChange.bind(this, "smell")}
				/>
				{/* chutova charakteristika */}
				<Input.Multiline
					icon={faCircle}
					value={record.taste}
					placeholder={strings("createCharacteristicsTaste")}
					lines={2}
					onChange={this.handleChange.bind(this, "taste")}
				/>
				{/* poznamka */}
				<Input.Multiline
					icon={faComments}
					value={record.notes}
					placeholder={strings("createNotes")}
					lines={5}
					onChange={this.handleChange.bind(this, "notes")}
				/>
				{/* zeme puvodu */}
				<Input.Picker
					icon={faGlobeAmericas}
					value={record.origin}
					placeholder={strings("createOrigin")}
					items={Object.entries(country).map((entry) => ({
						label: entry[1].name,
						value: entry[0]
					}))}
					onChange={this.handleChange.bind(this, "origin")}
				/>
				{/* cena */}
				<Input.Number icon={faEuroSign} value={record.price} placeholder={strings("createPrice")} onChange={this.handleChange.bind(this, "price")} />
				{/* zakoupeno */}
				<Input.Date value={record.purchased} placeholder={strings("createPurchased")} onChange={this.handleChange.bind(this, "purchased")} />
				{/* hodnoceni */}
				<Input.Number
					icon={faStarHalfAlt}
					value={record.rating}
					placeholder={strings("createRating")}
					onChange={this.handleChange.bind(this, "rating")}
				/>
				{/* delka zrani */}
				<Input.Number
					icon={faCircle}
					value={record.ripening}
					placeholder={strings("createRipening")}
					onChange={this.handleChange.bind(this, "ripening")}
				/>
			</ScrollView>
		);
	}

	private handleChange(field: keyof ICollectionRecord, value: string | number | Date): void {
		this.setState({
			record: {
				...this.state.record,
				[field]: value
			}
		});
	}
}
