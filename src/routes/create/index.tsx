/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	faCheck,
	faComments,
	faEuroSign,
	faFlask,
	faGlobeAmericas,
	faGrinTongue,
	faIndustry,
	faPalette,
	faPencilAlt,
	faPercentage,
	faSeedling,
	faStarHalfAlt,
	faWineBottle
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Route } from "../../components";
import { ICollectionRecord } from "../../types/collection";
import country from "../../utils/country";
import fs from "../../utils/file-system";
import strings from "../../utils/strings";

interface IAddState {
	record: ICollectionRecord;
	working: boolean;
}

/**
 * Pridani
 */
export default class Add extends Route.Content<unknown, IAddState> {
	/**
	 * Vychozi stav
	 */
	public state = {
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
			purchased: null,
			rating: null,
			ripening: null,
			smell: null,
			taste: null,
			volume: null
		},
		working: false
	};

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { record } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				busy={this.state.working}
				header={{
					actions: [
						{
							disabled: this.state.working,
							icon: faCheck,
							onPress: () => {
								this.setState(
									{
										working: true
									},
									() => {
										console.log(this.state.record);
										/*
										storage.collection.push(this.state.record).then(() => {
											history.push(getRouterPath("/overview"));
										});
									*/
									}
								);
							}
						}
					],
					title: strings("headerAdd")
				}}
			>
				<Form>
					{/* obrazek */}
					<Input.Image
						placeholder={strings("createImage")}
						onChange={(value) => {
							fs.collection.add(value, this.state.record.id).then((path) => {
								this.setState({
									record: {
										...this.state.record,
										images: [path]
									}
								});
							});
						}}
					/>
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
					<Input.Text
						icon={faPalette}
						value={record.color}
						placeholder={strings("createCharacteristicsColor")}
						onChange={this.handleChange.bind(this, "color")}
					/>
					{/* cichova charakteristika */}
					<Input.Text
						icon={faFlask}
						value={record.smell}
						placeholder={strings("createCharacteristicsSmell")}
						onChange={this.handleChange.bind(this, "smell")}
					/>
					{/* chutova charakteristika */}
					<Input.Text
						icon={faGrinTongue}
						value={record.taste}
						placeholder={strings("createCharacteristicsTaste")}
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
					<Input.Number
						icon={faEuroSign}
						value={record.price}
						placeholder={strings("createPrice")}
						onChange={this.handleChange.bind(this, "price")}
					/>
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
						icon={faSeedling}
						value={record.ripening}
						placeholder={strings("createRipening")}
						onChange={this.handleChange.bind(this, "ripening")}
					/>
				</Form>
			</Route.Wrapper>
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
