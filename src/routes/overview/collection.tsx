import React from "react";
import { Collection } from "../../components";
import { IHeader } from "../../components/header";
import { ICollectionRecord } from "../../types/collection";
import { collection } from "../../utils/storage";
import strings from "../../utils/strings";
import BaseRoute from "../base";

interface IOverviewCollectionState {
	records: ICollectionRecord[];
}

/**
 * Prehled
 */
export default class OverviewCollection extends BaseRoute<unknown, IOverviewCollectionState> {
	/**
	 * Vychozi stav
	 */
	public state = {
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
	 * Vlastni obsah routy
	 *
	 * @returns {JSX.Element} Element
	 */
	protected setHeaderProps(): IHeader {
		return {
			title: strings("headerMain")
		};
	}

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	protected renderRoute(): JSX.Element {
		return <Collection records={this.state.records} />;
	}
}
