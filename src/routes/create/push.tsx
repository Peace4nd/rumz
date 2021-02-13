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
import { ICollectionRecord } from "../../types/collection";
import { IFileDocument } from "../../types/file";
import country from "../../utils/country";
import fs from "../../utils/file-system";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface ICreateState {
	record: ICollectionRecord & { image: IFileDocument };
	working: boolean;
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
		record: null,
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
							icon: faEuroSign,
							name: "price",
							placeholder: strings("createPrice"),
							type: "number"
						},
						{
							icon: [faLongArrowAltDown, faLongArrowAltUp],
							name: "ripening",
							placeholder: [strings("createRipeningLowest"), strings("createRipeningHighest")],
							type: "range"
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
							icon: faComments,
							lines: 5,
							name: "notes",
							placeholder: strings("createNotes"),
							type: "multiline"
						},
						{
							name: "id",
							type: "hidden",
							value: uuidv4()
						},
						{
							name: "drunk",
							type: "hidden",
							value: 0
						}
					]}
					onChange={(values) => {
						this.setState({
							record: values
						});
					}}
				/>
			</Route.Wrapper>
		);
	}

	/**
	 * Ulozeni
	 */
	private handleSave = (): void => {
		// schovani klavesnice
		Keyboard.dismiss();
		// rozlozeni props
		const { id, image, ...rest } = this.state.record;
		// ulozeni
		fs.collection.save(image, id).then((path) => {
			storage.collection
				.push({
					...rest,
					id,
					image: {
						path
					}
				})
				.then(() => {
					this.redirect("/overview");
					ToastAndroid.show(strings("createSaveDone"), ToastAndroid.LONG);
				});
		});

		// ToastAndroid.show(strings("createSaveError"), ToastAndroid.LONG);
	};
}
