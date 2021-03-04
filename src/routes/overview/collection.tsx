import { faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SplashScreen from "react-native-splash-screen";
import { batch, connect, DispatchProp } from "react-redux";
import { Collection, Dialog, Input, Route } from "../../components";
import { loadRecords, updateRecord } from "../../redux/actions/collection";
import { signResolved } from "../../redux/actions/google";
import { loadOptions } from "../../redux/actions/options";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxGoogle, IReduxStore } from "../../types/redux";
import { IStorageSections } from "../../types/storage";
import ga from "../../utils/google";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface IOverviewCollectionState {
	selected: IDataCollection;
	opened: boolean;
	dram: number;
}

interface IOverviewCollectionProps extends DispatchProp {
	collection: IDataCollection[];
	google: IReduxGoogle;
	options: IDataOptions;
	init: boolean;
}

/**
 * Prehled
 */
class OverviewCollection extends Route.Content<IOverviewCollectionProps, IOverviewCollectionState> {
	/**
	 * Vychozi stav
	 */
	public state: IOverviewCollectionState = {
		dram: 0,
		opened: false,
		selected: null
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		// rozlozeni props
		const { google, init } = this.props;
		// splash screen
		SplashScreen.hide();
		// nacteni databaze
		if (!init) {
			storage.readAll().then((data: IStorageSections) => {
				batch(() => {
					this.props.dispatch(loadRecords(data.collection.records));
					this.props.dispatch(loadOptions(data.options.values));
				});
			});
		}
		// overeni pristupu ke google sluzbam
		if (!google.resolved) {
			ga.auth
				.signInSilently()
				.then((user) => {
					this.props.dispatch(signResolved(user));
				})
				.catch(() => {
					this.props.dispatch(signResolved());
				});
		}
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { opened } = this.state;
		const { collection, init, options } = this.props;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				busy={!init}
				title={strings("applicationTitle")}
				features={{
					menu: true,
					search: true
				}}
				padding={false}
			>
				{/* kolekce */}
				<Collection
					dram={options?.dram}
					records={collection}
					onPress={(record) => {
						this.redirect("/overview/:id", { id: record.id });
					}}
					onLongPress={this.handleDramOpen}
				/>
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
			</Route.Wrapper>
		);
	}

	/**
	 * Otevreni okna pro zadani panaku
	 *
	 * @param {IDataCollection} record Aktualni zaznam
	 */
	private handleDramOpen = (record: IDataCollection): void => {
		this.setState({
			opened: true,
			selected: record
		});
	};

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
		const { dram, selected } = this.state;
		// aktualizace zaznamu
		this.setState(
			{
				opened: false,
				selected: null
			},
			() => {
				this.props.dispatch(
					updateRecord(selected.id, {
						drunk: selected.drunk + dram
					})
				);
			}
		);
	};
}

export default connect((store: IReduxStore) => ({
	collection: store.collection.records,
	google: store.google,
	init: store.collection.init && store.options.init,
	options: store.options.values
}))(OverviewCollection);
