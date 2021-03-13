import {
	faBox,
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
	faWineBottle
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Keyboard, ToastAndroid } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Form, Route } from "../../components";
import { pushRecord } from "../../redux/actions/collection";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IFileDocument } from "../../types/file";
import { IReduxCollection, IReduxStore } from "../../types/redux";
import assets from "../../utils/assets";
import country from "../../utils/country";
import strings from "../../utils/strings";

interface ICreatePushState {
	record: Omit<IDataCollection, "image"> & { image: IFileDocument };
	working: boolean;
}

interface ICreatePushProps extends DispatchProp {
	options: IDataOptions;
	predefined: IReduxCollection["predefined"];
}

interface ICreatePushParams {
	id: string;
}

/**
 * Pridani
 */
class CreatePush extends Route.Content<ICreatePushProps, ICreatePushState, ICreatePushParams> {
	/**
	 * Vychozi stav
	 */
	public state: ICreatePushState = {
		record: null,
		working: false
	};

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { options, predefined } = this.props;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				title={strings("createTitle")}
				features={{
					actions: [
						{
							disabled: this.state.working,
							icon: faCheck,
							onPress: this.handleSave,
							type: "press"
						}
					],
					back: true
				}}
				busy={this.state.working}
				scrollable={true}
			>
				<Form<IDataCollection>
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
							predefined: predefined.manufacturer,
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
							type: "number",
							unit: "%"
						},
						{
							icon: faPalette,
							items: options.properties.color,
							name: "color",
							placeholder: strings("createColor"),
							type: "tags"
						},
						{
							icon: faFlask,
							items: options.properties.aroma,
							name: "aroma",
							placeholder: strings("createAroma"),
							type: "tags"
						},
						{
							icon: faGlassCheers,
							items: options.properties.taste,
							name: "taste",
							placeholder: strings("createTaste"),
							type: "tags"
						},
						{
							icon: faBox,
							items: options.cask.map((item) => ({
								label: item,
								value: item
							})),
							name: "cask",
							placeholder: strings("createCask"),
							type: "picker"
						},
						{
							icon: faEuroSign,
							name: "price",
							placeholder: strings("createPrice"),
							type: "number",
							unit: "Kč"
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
		assets.create(image.path, id).then((path) => {
			// redux
			this.props.dispatch(
				pushRecord({
					...rest,
					id,
					image: path
				})
			);
			// presmerovani
			this.redirect("/overview");
			// notifikace
			ToastAndroid.show(strings("createSaveDone"), ToastAndroid.LONG);
		});
	};
}

export default connect((store: IReduxStore) => ({
	options: store.options.values,
	predefined: store.collection.predefined
}))(CreatePush);
