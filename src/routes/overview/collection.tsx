import { faEllipsisV, faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SplashScreen from "react-native-splash-screen";
import { connect, DispatchProp } from "react-redux";
import { Collection, Dialog, Input, Route } from "../../components";
import { signResolved } from "../../redux/actions/google";
import { IReduxGoogle, IReduxStore } from "../../types/redux";
import { IStorageCollection, IStorageOptions } from "../../types/storage";
import ga from "../../utils/google";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface IOverviewCollectionState {
	records: IStorageCollection[];
	selected: IStorageCollection;
	opened: boolean;
	options: IStorageOptions;
	loaded: boolean;
	dram: number;
}

interface IOverviewCollectionProps {
	google: IReduxGoogle;
}

/**
 * Prehled
 */
class OverviewCollection extends Route.Content<IOverviewCollectionProps & DispatchProp, IOverviewCollectionState> {
	/**
	 * Vychozi stav
	 */
	public state: IOverviewCollectionState = {
		dram: 0,
		loaded: false,
		opened: false,
		options: null,
		records: [],
		selected: null
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		// rozlozeni props
		const { google } = this.props;
		// overeni googlu
		Promise.all([storage.collection.read(), storage.options.read()]).then((values) => {
			this.setState(
				{
					loaded: true,
					options: values[1],
					records: values[0]
				},
				() => {
					// ukonceni splash screen
					SplashScreen.hide();
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
			);
		});
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { loaded, opened, options, records } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				header={{
					actionRight: {
						icon: faEllipsisV,
						items: {
							options: strings("optionsTitle")
						},
						onPress: (item) => {
							switch (item) {
								case "options":
									this.redirect("/options");
									break;
							}
						}
					},
					title: strings("headerMain")
				}}
				busy={!loaded}
			>
				{/* kolekce */}
				<Collection
					dram={options?.dram}
					records={records}
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
	 * @param {IStorageCollection} record Aktualni zaznam
	 */
	private handleDramOpen = (record: IStorageCollection): void => {
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
		storage.collection.update(selected.id, { drunk: selected.drunk + dram }).then((updated) => {
			this.setState({
				opened: false,
				records: updated,
				selected: null
			});
		});
	};
}

export default connect((store: IReduxStore) => ({
	google: store.google
}))(OverviewCollection);
