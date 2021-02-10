/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	faCheck,
	faComments,
	faEuroSign,
	faFlask,
	faGlassCheers,
	faGlobeAmericas,
	faImage,
	faIndustry,
	faPalette,
	faPencilAlt,
	faPercentage,
	faSeedling,
	faSmile,
	faTimes,
	faWineBottle
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Keyboard, ToastAndroid } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Route } from "../../components";
import { IInputState } from "../../components/input";
import { ICollectionRecord } from "../../types/collection";
import country from "../../utils/country";
import fs from "../../utils/file-system";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface ICreateState {
	existing: ICollectionRecord;
	record: ICollectionRecord;
	filled: Record<keyof ICollectionRecord, boolean>;
	working: boolean;
	highlight: boolean;
}

interface ICreateParams {
	id: string;
}

/**
 * Pridani
 */
export default class Create extends Route.Content<unknown, ICreateState, ICreateParams> {
	/**
	 * Vychozi stav
	 */
	public state: ICreateState = {
		existing: null,
		filled: {
			alcohol: false,
			color: false,
			id: true,
			image: false,
			manufacturer: false,
			name: false,
			notes: false,
			origin: false,
			price: false,
			purchased: false,
			rating: false,
			ripening: false,
			smell: false,
			taste: false,
			volume: false
		},
		highlight: false,
		record: {
			alcohol: null,
			color: null,
			id: uuidv4(),
			image: null,
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
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		const id = this.getParamValue("id");
		if (id) {
			storage.collection.find(id).then((record) => {
				this.setState({
					existing: record
				});
			});
		}
	}

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { existing, filled, highlight } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				busy={this.state.working}
				header={{
					actionLeft: {
						icon: faTimes,
						onPress: () => this.redirect("/overview")
					},
					actionRight: {
						disabled: this.state.working,
						icon: faCheck,
						onPress: this.handleSave
					},
					title: strings("headerAdd")
				}}
			>
				<Form>
					{/* obrazek */}
					<Input.Image
						highlight={highlight && !filled.image}
						icon={faImage}
						placeholder={strings("createImage")}
						onChange={this.handleChange.bind(this, "image")}
						value={existing?.image}
					/>
					{/* nazev */}
					<Input.Text
						highlight={highlight && !filled.name}
						icon={faPencilAlt}
						placeholder={strings("createName")}
						onChange={this.handleChange.bind(this, "name")}
						value={existing?.name}
					/>
					{/* vyrobce */}
					<Input.Text
						highlight={highlight && !filled.manufacturer}
						icon={faIndustry}
						placeholder={strings("createManufacturer")}
						onChange={this.handleChange.bind(this, "manufacturer")}
						value={existing?.manufacturer}
					/>
					{/* objem lahve */}
					<Input.Number
						highlight={highlight && !filled.volume}
						icon={faWineBottle}
						placeholder={strings("createVolume")}
						onChange={this.handleChange.bind(this, "volume")}
						value={existing?.volume}
					/>
					{/* obsah alkoholu */}
					<Input.Number
						highlight={highlight && !filled.alcohol}
						icon={faPercentage}
						placeholder={strings("createAlcohol")}
						onChange={this.handleChange.bind(this, "alcohol")}
						value={existing?.alcohol}
					/>
					{/* barva */}
					<Input.Text
						highlight={highlight && !filled.color}
						icon={faPalette}
						placeholder={strings("createCharacteristicsColor")}
						onChange={this.handleChange.bind(this, "color")}
						value={existing?.color}
					/>
					{/* cichova charakteristika */}
					<Input.Text
						highlight={highlight && !filled.smell}
						icon={faFlask}
						placeholder={strings("createCharacteristicsSmell")}
						onChange={this.handleChange.bind(this, "smell")}
						value={existing?.smell}
					/>
					{/* chutova charakteristika */}
					<Input.Text
						highlight={highlight && !filled.taste}
						icon={faGlassCheers}
						placeholder={strings("createCharacteristicsTaste")}
						onChange={this.handleChange.bind(this, "taste")}
						value={existing?.taste}
					/>
					{/* poznamka */}
					<Input.Multiline
						highlight={highlight && !filled.notes}
						icon={faComments}
						placeholder={strings("createNotes")}
						lines={5}
						onChange={this.handleChange.bind(this, "notes")}
						value={existing?.notes}
					/>
					{/* zeme puvodu */}
					<Input.Picker
						highlight={highlight && !filled.origin}
						icon={faGlobeAmericas}
						placeholder={strings("createOrigin")}
						items={Object.entries(country).map((entry) => ({
							label: entry[1].name,
							value: entry[0]
						}))}
						onChange={this.handleChange.bind(this, "origin")}
						value={existing?.origin}
					/>
					{/* cena */}
					<Input.Number
						highlight={highlight && !filled.price}
						icon={faEuroSign}
						placeholder={strings("createPrice")}
						onChange={this.handleChange.bind(this, "price")}
						value={existing?.price}
					/>
					{/* zakoupeno */}
					<Input.Date
						highlight={highlight && !filled.purchased}
						placeholder={strings("createPurchased")}
						onChange={this.handleChange.bind(this, "purchased")}
						value={existing?.purchased}
					/>
					{/* hodnoceni */}
					<Input.Rating
						highlight={highlight && !filled.rating}
						icon={faSmile}
						placeholder={strings("createRating")}
						onChange={this.handleChange.bind(this, "rating")}
						value={existing?.rating}
					/>
					{/* delka zrani */}
					<Input.Number
						highlight={highlight && !filled.ripening}
						icon={faSeedling}
						placeholder={strings("createRipening")}
						onChange={this.handleChange.bind(this, "ripening")}
						value={existing?.ripening}
					/>
				</Form>
			</Route.Wrapper>
		);
	}

	/**
	 * Ulozeni
	 */
	private handleSave = (): void => {
		// kontrola validitz
		const filled = Object.values(this.state.filled).reduce((prev, current) => prev && current, true);
		// pokud je vse OK
		if (filled) {
			// schovani klavesnice
			Keyboard.dismiss();
			// zpracovani
			this.setState(
				{
					highlight: false,
					working: true
				},
				() => {
					// rozlozeni zaznamu
					const { image, ...rest } = this.state.record;
					// ulozeni
					fs.collection.save(image, this.state.record.id).then((path) => {
						storage.collection
							.push({
								...rest,
								image: {
									path
								}
							})
							.then(() => {
								this.redirect("/overview");
								ToastAndroid.show(strings("createSaveDone"), ToastAndroid.LONG);
							});
					});
				}
			);
		} else {
			this.setState(
				{
					highlight: true
				},
				() => {
					ToastAndroid.show(strings("createSaveError"), ToastAndroid.LONG);
				}
			);
		}
	};

	/**
	 * Zmena dat
	 *
	 * @param {keyof ICollectionRecord} field Pole
	 * @param {unknown} value Hodnota
	 * @param {IInputState} state Stav vstupniho pole
	 */
	private handleChange(field: keyof ICollectionRecord, value: unknown, state: IInputState): void {
		this.setState({
			filled: {
				...this.state.filled,
				[field]: state.filled && state.valid
			},
			record: {
				...this.state.record,
				[field]: value
			}
		});
	}
}
