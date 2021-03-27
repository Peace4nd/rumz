import { faGlassWhiskey, faPencilAlt, faShareAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Share, StyleSheet, View } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ContextMenu, CountryFlag, Dialog, Grid, Image, Input, Rating, Route, Typography, Value } from "../../components";
import { removeRecord, updateRecord } from "../../redux/actions/collection";
import { Color, Size } from "../../styles";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxStore } from "../../types/redux";
import assets from "../../utils/assets";
import { stringify } from "../../utils/collection";
import confirm from "../../utils/confirm";
import country from "../../utils/country";
import format from "../../utils/format";
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
	},
	valueMissing: {
		color: Color.Muted
	},
	valueMissingMandatory: {
		color: Color.Base
	}
});

interface IOverviewDetailState {
	opened: boolean;
	dram: number;
}

interface IOverviewDetailProps extends DispatchProp {
	record: IDataCollection;
	options: IDataOptions;
}

interface IOverviewDetailParams {
	id: string;
}

/**
 * Detail
 */
class OverviewDetail extends Route.Content<IOverviewDetailProps, IOverviewDetailState, IOverviewDetailParams> {
	/**
	 * Vychozi stav
	 */
	public state: IOverviewDetailState = {
		dram: 0,
		opened: false
	};

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { record, options } = this.props;
		const { opened } = this.state;
		// sestaveni a vraceni
		return (
			<React.Fragment>
				<Route.Wrapper
					title={record.name}
					features={{
						back: true,
						menu: {
							enabled: true
						}
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
								<Value label={strings("createName")} mandatory={options.mandatory.includes("name")} formated={format.string(record.name)} />
							</Grid.Column>
						</Grid.Row>
						{/* doplnujici nazev */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createSubname")}
									mandatory={options.mandatory.includes("subname")}
									formated={format.string(record.subname)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* vyrobce */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createManufacturer")}
									mandatory={options.mandatory.includes("manufacturer")}
									formated={format.string(record.manufacturer)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* objem */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createVolume")}
									mandatory={options.mandatory.includes("volume")}
									formated={format.number(record.volume, "ml")}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* alkohol */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createAlcohol")}
									mandatory={options.mandatory.includes("alcohol")}
									formated={format.number(record.alcohol, "%")}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* barva */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createColor")} mandatory={options.mandatory.includes("color")} formated={format.array(record.color)} />
							</Grid.Column>
						</Grid.Row>
						{/* aroma */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createAroma")} mandatory={options.mandatory.includes("aroma")} formated={format.array(record.aroma)} />
							</Grid.Column>
						</Grid.Row>
						{/* chut */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createTaste")} mandatory={options.mandatory.includes("taste")} formated={format.array(record.taste)} />
							</Grid.Column>
						</Grid.Row>
						{/* sud */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createCask")} mandatory={options.mandatory.includes("cask")} formated={format.string(record.cask)} />
							</Grid.Column>
						</Grid.Row>
						{/* cena */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createPrice")}
									mandatory={options.mandatory.includes("price")}
									formated={format.number(record.price, "Kč")}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* zrani */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createRipening")}
									mandatory={options.mandatory.includes("ripening")}
									formated={format.range(record.ripening, strings("overviewRipeningYears"))}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* stat */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createOrigin")}
									mandatory={options.mandatory.includes("origin")}
									render={() => (
										<View style={styles.originWrapper}>
											<CountryFlag code={record.origin} style={styles.originFlag} />
											<Typography type="Body1">{record.origin ? country[record.origin].name : null}</Typography>
										</View>
									)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* zakoupeno */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createPurchased")}
									mandatory={options.mandatory.includes("purchased")}
									formated={format.date(record.purchased)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* hodnoceni */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createRating")}
									mandatory={options.mandatory.includes("rating")}
									render={() => <Rating value={record.rating} />}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* poznamka */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createNotes")} mandatory={options.mandatory.includes("notes")} formated={format.string(record.notes)} />
							</Grid.Column>
						</Grid.Row>
					</Grid.Wrapper>
				</Route.Wrapper>
				{/* modal pro pridani panaku */}
				<Dialog
					opened={opened}
					title={strings("overviewDramTitle")}
					onToggle={(state) => {
						this.setState({ opened: state });
					}}
					button={{
						icon: faGlassWhiskey,
						label: strings("overviewDramDrink"),
						onPress: this.handleDramUpdate
					}}
				>
					<Input.Spinner placeholder={strings("overviewDramCount")} min={1} max={99} onChange={this.handleDramChange} />
				</Dialog>
				{/* kontextova nabidka */}
				<ContextMenu
					items={[
						{
							icon: faShareAlt,
							label: strings("overviewShare"),
							onPress: () => {
								Share.share({
									message: stringify(record),
									title: record.name
								});
							}
						},
						{
							icon: faPencilAlt,
							label: "Editovat",
							onPress: () => {
								this.redirect("/update/:id", { id: record.id });
							}
						},
						{
							icon: faGlassWhiskey,
							label: strings("overviewDramDrink"),
							onPress: () => {
								this.setState({
									opened: true
								});
							}
						},
						{
							icon: faTrash,
							label: strings("overviewEditRemove"),
							onPress: confirm.delete({
								cancelable: true,
								onConfirm: () => {
									Promise.all([storage.collection.remove(record.id), assets.remove(record.image)]).then(() => {
										this.props.dispatch(removeRecord(record.id));
										this.redirect("/overview");
									});
								}
							})
						}
					]}
				/>
			</React.Fragment>
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
	private handleImage(id: string, value: string): void {
		assets.create(value, id).then((path) => {
			this.props.dispatch(updateRecord(id, { image: path }));
		});
	}

	/**
	 * Zmena poctu panaku
	 *
	 * @param {number} value Pocet
	 */
	private handleDramChange = (value: number): void => {
		this.setState({
			dram: value
		});
	};

	/**
	 * Aktualizace panaku
	 */
	private handleDramUpdate = (): void => {
		// rozlozeni props
		const { options, record } = this.props;
		const { dram } = this.state;
		// aktualizace zaznamu
		this.setState(
			{
				opened: false
			},
			() => {
				this.props.dispatch(
					updateRecord(record.id, {
						drunk: record.drunk + options.dram * dram
					})
				);
			}
		);
	};
}

export default connect((store: IReduxStore, props: IOverviewDetailProps & RouteComponentProps<IOverviewDetailParams>) => ({
	options: store.options.values,
	record: store.collection.records.find((col) => col.id === props.match.params.id)
}))(OverviewDetail);
