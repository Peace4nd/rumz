import React from "react";
import { Collection, Route } from "../../components";
import { ICollectionRecord } from "../../types/collection";
import { collection } from "../../utils/storage";
import strings from "../../utils/strings";

interface IOverviewCollectionState {
	records: ICollectionRecord[];
}

/**
 * Prehled
 */
export default class OverviewCollection extends Route.Content<unknown, IOverviewCollectionState> {
	/**
	 * Vychozi stav
	 */
	public state = {
		records: [],
		working: false
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

	public render(): JSX.Element {
		return (
			<Route.Wrapper header={{ title: strings("headerMain") }}>
				<Collection
					records={this.state.records}
					onClick={(record) => {
						this.redirect("/overview/:id", { id: record.id });
					}}
				/>
			</Route.Wrapper>
		);
	}
}
