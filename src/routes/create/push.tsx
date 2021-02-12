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
	faLongArrowAltDown,
	faLongArrowAltUp,
	faPalette,
	faPencilAlt,
	faPercentage,
	faSmile,
	faTimes,
	faWineBottle
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Keyboard, ToastAndroid } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { Form, Route } from "../../components";
import { IInputState } from "../../components/input";
import { ICollectionRecord } from "../../types/collection";
import { IFileDocument } from "../../types/file";
import country from "../../utils/country";
import fs from "../../utils/file-system";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface ICreateState {
	record: ICollectionRecord & { image: IFileDocument };
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
		filled: {
			alcohol: false,
			color: false,
			drunk: false,
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
			drunk: null,
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
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
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
				<Form<ICollectionRecord>
					fields={[
						{
							icon: faImage,
							name: "image",
							placeholder: strings("createImage"),
							type: "image"
						},
						{
							icon: faPencilAlt,
							name: "name",
							placeholder: strings("createName"),
							type: "text"
						},
						{
							icon: faIndustry,
							name: "manufacturer",
							placeholder: strings("createManufacturer"),
							type: "text"
						},
						{
							icon: faWineBottle,
							name: "volume",
							placeholder: strings("createVolume"),
							type: "number"
						},
						{
							icon: faPercentage,
							name: "alcohol",
							placeholder: strings("createAlcohol"),
							type: "number"
						},
						{
							icon: faPalette,
							name: "color",
							placeholder: strings("createCharacteristicsColor"),
							type: "text"
						},
						{
							icon: faFlask,
							name: "smell",
							placeholder: strings("createCharacteristicsSmell"),
							type: "text"
						},
						{
							icon: faGlassCheers,
							name: "taste",
							placeholder: strings("createCharacteristicsTaste"),
							type: "text"
						},
						{
							icon: faComments,
							lines: 5,
							name: "notes",
							placeholder: strings("createNotes"),
							type: "multiline"
						},
						{
							icon: faGlobeAmericas,
							items: Object.entries(country).map((entry) => ({
								label: entry[1].name,
								value: entry[0]
							})),
							name: "origin",
							placeholder: strings("createOrigin"),
							type: "picker"
						},
						{
							icon: faEuroSign,
							name: "price",
							placeholder: strings("createPrice"),
							type: "number"
						},
						{
							name: "purchased",
							placeholder: strings("createPurchased"),
							type: "date"
						},
						{
							icon: faSmile,
							name: "rating",
							placeholder: strings("createRating"),
							type: "rating"
						},
						{
							icon: [faLongArrowAltDown, faLongArrowAltUp],
							name: "ripening",
							placeholder: [strings("createRipeningLowest"), strings("createRipeningHighest")],
							type: "range"
						}
					]}
					onChange={(values) => {
						console.log(values);
					}}
				/>
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
					fs.collection.save(this.state.record.image, this.state.record.id).then((path) => {
						storage.collection
							.push({
								...this.state.record,
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
