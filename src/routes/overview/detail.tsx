import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Share, StyleSheet, View } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { CountryFlag, Editable, Grid, Route, Typography } from "../../components";
import { removeRecord, updateRecord } from "../../redux/actions/collection";
import { Size } from "../../styles";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IFileDocument } from "../../types/file";
import { IReduxStore } from "../../types/redux";
import assets from "../../utils/assets";
import { stringify } from "../../utils/collection";
import country from "../../utils/country";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

const styles = StyleSheet.create({
	originFlag: {
		marginRight: Size["1x"]
	},
	originWrapper: {
		alignItems: "center",
		flexDirection: "row",
		height: Size["3x"]
	}
});
interface IOverviewDetailProps extends DispatchProp {
	collection: IDataCollection[];
	options: IDataOptions;
}

interface IOverviewDetailParams {
	id: string;
}

/**
 * Detail
 */
class OverviewDetail extends Route.Content<IOverviewDetailProps, unknown, IOverviewDetailParams> {
	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { collection, options } = this.props;
		// nalezeni zaznamu
		const record = collection.find((col) => col.id === this.getParamValue("id"));
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				title={record.name}
				features={{
					actions: [
						{
							icon: faShareAlt,
							onPress: () => {
								Share.share({
									message: stringify(record),
									title: record.name
								});
							},
							type: "press"
						}
					],
					back: true,
					menu: {
						enabled: true,
						items: [
							{
								label: strings("overviewEditRemove"),
								onPress: () => {
									Promise.all([storage.collection.remove(record.id), assets.remove(record.image)]).then(() => {
										this.props.dispatch(removeRecord(record.id));
										this.redirect("/overview");
									});
								},
								type: "press"
							}
						]
					}
				}}
				scrollable={true}
			>
				<Grid.Wrapper>
					{/* obrazek */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Image
								mandatory={options.mandatory.includes("image")}
								value={{ path: record.image }}
								onChange={this.handleImage.bind(this, record.id)}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* nazev */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Text
								label={strings("createName")}
								mandatory={options.mandatory.includes("name")}
								value={record.name}
								onChange={this.handleChange.bind(this, record.id, "name")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* doplnujici nazev */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Text
								label={strings("createSubname")}
								mandatory={options.mandatory.includes("subname")}
								value={record.subname}
								onChange={this.handleChange.bind(this, record.id, "subname")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* vyrobce */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Text
								label={strings("createManufacturer")}
								mandatory={options.mandatory.includes("manufacturer")}
								value={record.manufacturer}
								onChange={this.handleChange.bind(this, record.id, "manufacturer")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* objem */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Number
								label={strings("createVolume")}
								mandatory={options.mandatory.includes("volume")}
								value={record.volume}
								unit="ml"
								onChange={this.handleChange.bind(this, record.id, "volume")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* alkohol */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Number
								label={strings("createAlcohol")}
								mandatory={options.mandatory.includes("alcohol")}
								value={record.alcohol}
								unit="%"
								onChange={this.handleChange.bind(this, record.id, "alcohol")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* barva */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Tags
								field={{
									items: options.properties.color
								}}
								label={strings("createColor")}
								mandatory={options.mandatory.includes("color")}
								value={record.color}
								onChange={this.handleChange.bind(this, record.id, "color")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* aroma */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Tags
								field={{
									items: options.properties.aroma
								}}
								label={strings("createAroma")}
								mandatory={options.mandatory.includes("aroma")}
								value={record.aroma}
								onChange={this.handleChange.bind(this, record.id, "aroma")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* chut */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Tags
								field={{
									items: options.properties.taste
								}}
								label={strings("createTaste")}
								mandatory={options.mandatory.includes("taste")}
								value={record.taste}
								onChange={this.handleChange.bind(this, record.id, "taste")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* sud */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Picker
								field={{
									items: options.cask.map((item) => ({
										label: item,
										value: item
									}))
								}}
								label={strings("createCask")}
								mandatory={options.mandatory.includes("cask")}
								value={record.cask}
								onChange={this.handleChange.bind(this, record.id, "cask")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* cena */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Number
								label={strings("createPrice")}
								mandatory={options.mandatory.includes("price")}
								value={record.price}
								unit="Kč"
								onChange={this.handleChange.bind(this, record.id, "price")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* zrani */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Range
								label={strings("createRipening")}
								mandatory={options.mandatory.includes("ripening")}
								value={record.ripening}
								unit={strings("overviewRipeningYears")}
								placeholder={[strings("createRipeningLowest"), strings("createRipeningHighest")]}
								onChange={this.handleChange.bind(this, record.id, "ripening")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* stat */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Picker
								field={{
									items: Object.entries(country).map((entry) => ({
										label: entry[1].name,
										value: entry[0]
									}))
								}}
								label={strings("createOrigin")}
								mandatory={options.mandatory.includes("origin")}
								value={record.origin}
								customRenderValue={() => (
									<View style={styles.originWrapper}>
										<CountryFlag code={record.origin} style={styles.originFlag} />
										<Typography type="Body1">{record.origin ? country[record.origin].name : null}</Typography>
									</View>
								)}
								onChange={this.handleChange.bind(this, record.id, "origin")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* zakoupeno */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Date
								label={strings("createPurchased")}
								mandatory={options.mandatory.includes("purchased")}
								value={record.purchased}
								onChange={this.handleChange.bind(this, record.id, "purchased")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* hodnoceni */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Rating
								label={strings("createRating")}
								mandatory={options.mandatory.includes("rating")}
								value={record.rating}
								onChange={this.handleChange.bind(this, record.id, "rating")}
							/>
						</Grid.Column>
					</Grid.Row>
					{/* poznamka */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Multiline
								field={{ lines: 3 }}
								label={strings("createNotes")}
								mandatory={options.mandatory.includes("notes")}
								value={record.notes}
								onChange={this.handleChange.bind(this, record.id, "notes")}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid.Wrapper>
			</Route.Wrapper>
		);
	}

	/**
	 * Uprava hodnoty
	 *
	 * @param {string} id Identifikator
	 * @param {keyof IDataCollection} field Pole
	 * @param {unknown} value Hodnota
	 */
	private handleChange(id: string, field: keyof IDataCollection, value: unknown): void {
		this.props.dispatch(updateRecord(id, { [field]: value }));
	}

	/**
	 * Uprava obrazku
	 *
	 * @param {string} id Identifikator
	 * @param {unknown} value Hodnota
	 */
	private handleImage(id: string, value: IFileDocument): void {
		assets.create(value.path, id).then((path) => {
			this.props.dispatch(updateRecord(id, { image: path }));
		});
	}
}

export default connect((store: IReduxStore) => ({
	collection: store.collection.records,
	options: store.options.values
}))(OverviewDetail);
