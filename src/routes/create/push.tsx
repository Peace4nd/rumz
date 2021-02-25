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
import mime from "mime";
import React from "react";
import { Keyboard, ToastAndroid } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Form, Route } from "../../components";
import { pushRecord } from "../../redux/actions/collection";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IFileDocument } from "../../types/file";
import { IReduxStore } from "../../types/redux";
import assets from "../../utils/assets";
import country from "../../utils/country";
import strings from "../../utils/strings";

interface ICreatePushState {
	record: Omit<IDataCollection, "image"> & { image: IFileDocument };
	working: boolean;
}

interface ICreatePushProps extends DispatchProp {
	options: IDataOptions;
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
		const { options } = this.props;
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
							items: options.properties.color,
							name: "color",
							placeholder: strings("createCharacteristicsColor"),
							type: "tags"
						},
						{
							icon: faFlask,
							items: options.properties.aroma,
							name: "aroma",
							placeholder: strings("createCharacteristicsAroma"),
							type: "tags"
						},
						{
							icon: faGlassCheers,
							items: options.properties.taste,
							name: "taste",
							placeholder: strings("createCharacteristicsTaste"),
							type: "tags"
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
		assets.copy(image.path, id + "." + mime.getExtension(image.mime)).then((path) => {
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
	options: store.options.values
}))(CreatePush);
