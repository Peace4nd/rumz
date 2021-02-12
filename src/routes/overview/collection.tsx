import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text } from "react-native";
import { Collection, Dialog, Route } from "../../components";
import { ICollectionRecord } from "../../types/collection";
import { collection } from "../../utils/storage";
import strings from "../../utils/strings";

interface IOverviewCollectionState {
	records: ICollectionRecord[];
	current: ICollectionRecord;
	opened: boolean;
}

/**
 * Prehled
 */
export default class OverviewCollection extends Route.Content<unknown, IOverviewCollectionState> {
	/**
	 * Vychozi stav
	 */
	public state: IOverviewCollectionState = {
		current: null,
		opened: false,
		records: []
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		collection.read().then((records) => {
			this.setState({
				records
			});
		});
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		const { current, opened, records } = this.state;
		return (
			<Route.Wrapper
				header={{
					actionRight: {
						icon: faEllipsisV,
						items: {
							options: "Nastavení"
						},
						onPress: (item) => console.log(item)
					},
					title: strings("headerMain")
				}}
				busy={records === null}
			>
				{/* kolekce */}
				<Collection
					records={records}
					onPress={(record) => {
						this.redirect("/overview/:id", { id: record.id });
					}}
					onLongPress={(record) => {
						this.setState({
							current: record,
							opened: true
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
					<Text>nejaky obsah</Text>
				</Dialog>
			</Route.Wrapper>
		);
	}
}
