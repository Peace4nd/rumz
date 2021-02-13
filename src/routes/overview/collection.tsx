import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text } from "react-native";
import { Collection, Dialog, Route } from "../../components";
import { ICollectionRecord } from "../../types/collection";
import { IOptions } from "../../types/options";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface IOverviewCollectionState {
	records: ICollectionRecord[];
	selected: ICollectionRecord;
	opened: boolean;
	options: IOptions;
	loaded: boolean;
}

/**
 * Prehled
 */
export default class OverviewCollection extends Route.Content<unknown, IOverviewCollectionState> {
	/**
	 * Vychozi stav
	 */
	public state: IOverviewCollectionState = {
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
		Promise.all([storage.collection.read(), storage.options.read()]).then((values) => {
			this.setState({
				loaded: true,
				options: values[1],
				records: values[0]
			});
		});
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { loaded, opened, options, records, selected } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				header={{
					actionRight: {
						icon: faEllipsisV,
						items: {
							options: "Nastavení"
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
					onLongPress={(record) => {
						this.setState({
							opened: true,
							selected: record
						});
					}}
				/>
				{/* modal pro pridani panaku */}
				<Dialog
					opened={opened}
					title="vypiti"
					onToggle={(state) => {
						this.setState({ opened: state });
					}}
				>
					{/* TODO: tady doplnit "form" na zadavani poctu vypitych panaku */}
					<Text>nejaky obsah pro zaznam: {selected?.id}</Text>
				</Dialog>
			</Route.Wrapper>
		);
	}
}
