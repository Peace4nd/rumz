import {
	faBox,
	faCheck,
	faComments,
	faEuroSign,
	faFlask,
	faGlassCheers,
	faGlassWhiskey,
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
import { RouteComponentProps } from "react-router";
import { Form, Route } from "../../components";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxCollection, IReduxStore } from "../../types/redux";
import country from "../../utils/country";
import strings from "../../utils/strings";

interface IUpdateState {
	record: IDataCollection;
	changed: Partial<Record<keyof IDataCollection, boolean>>;
	working: boolean;
}

interface IUpdateProps extends DispatchProp {
	options: IDataOptions;
	predefined: IReduxCollection["predefined"];
	record: IDataCollection;
}

interface IUpdateParams {
	id: string;
}

/**
 * Editace
 */
class Update extends Route.Content<IUpdateProps, IUpdateState, IUpdateParams> {
	/**
	 * Vychozi stav
	 */
	public state: IUpdateState = {
		changed: {},
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
		const { options, predefined, record } = this.props;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				title={record.name}
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
					values={record}
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
							icon: faPencilAlt,
							name: "subname",
							placeholder: strings("createSubname"),
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
							icon: faGlassWhiskey,
							name: "drunk",
							placeholder: strings("createDrunk"),
							type: "number",
							unit: "ml"
						},
						{
							name: "id",
							type: "hidden"
						}
					]}
					onChange={(values, field) => {
						this.setState({
							changed: {
								...this.state.changed,
								[field]: true
							},
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
		// zmenene polozky
		const changed = Object.values(this.state.changed);
		// pokud existuje zmena
		if (changed.length > 0) {
			// rozlozeni zaznamu
			const { id, image, ...rest } = this.state.record;

			console.log("===========================================");
			console.log(JSON.stringify(this.state.changed, null, 4));
			console.log("-------------------------------------------");
			console.log(JSON.stringify(this.state.record, null, 4));
			console.log("===========================================");

			/*
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
		*/
		} else {
			// notifikace
			ToastAndroid.show(strings("createSaveDone"), ToastAndroid.LONG);
		}
	};
}

export default connect((store: IReduxStore, props: IUpdateProps & RouteComponentProps<IUpdateParams>) => ({
	options: store.options.values,
	predefined: store.collection.predefined,
	record: store.collection.records.find((col) => col.id === props.match.params.id)
}))(Update);
