import React from "react";
import { StyleSheet, View } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { CountryFlag, Editable, Grid, Image, Route, Typography } from "../../components";
import { updateRecord } from "../../redux/actions/collection";
import { Size } from "../../styles";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxStore } from "../../types/redux";
import country from "../../utils/country";
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
					back: true,
					menu: true
				}}
				scrollable={true}
			>
				<Grid.Wrapper>
					{/* obrazek */}
					<Grid.Row>
						<Grid.Column>
							<Image source={record.image} />
						</Grid.Column>
					</Grid.Row>
					{/* nazev */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Text label={strings("createName")} value={record.name} onChange={this.handleChange.bind(this, record.id, "name")} />
						</Grid.Column>
					</Grid.Row>
					{/* vyrobce */}
					<Grid.Row>
						<Grid.Column>
							<Editable.Text
								label={strings("createManufacturer")}
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
								label={strings("createCharacteristicsColor")}
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
								label={strings("createCharacteristicsAroma")}
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
								label={strings("createCharacteristicsTaste")}
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
								value={record.origin}
								customRenderValue={() => (
									<View style={styles.originWrapper}>
										<CountryFlag code={record.origin} style={styles.originFlag} />
										<Typography type="Body1">{country[record.origin].name}</Typography>
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
								value={record.notes}
								onChange={this.handleChange.bind(this, record.id, "notes")}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid.Wrapper>
			</Route.Wrapper>
		);
	}

	private handleChange(id: string, field: keyof IDataCollection, value: unknown): void {
		this.props.dispatch(updateRecord(id, { [field]: value }));
	}
}

export default connect((store: IReduxStore) => ({
	collection: store.collection.records,
	options: store.options.values
}))(OverviewDetail);
