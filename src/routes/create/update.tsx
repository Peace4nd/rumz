import React from "react";
import { Text } from "react-native";
import { Route } from "../../components";
import { IStorageCollection } from "../../types/storage";
import storage from "../../utils/storage";

interface ICreateState {
	record: IStorageCollection;
}

interface ICreateParams {
	id: string;
}

/**
 * Pridani
 */
export default class Create extends Route.Content<unknown, ICreateState, ICreateParams> {
	/**
	 * Vychozi stav
	 */
	public state: ICreateState = {
		record: null
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		const id = this.getParamValue("id");
		if (id) {
			storage.collection.find(id).then((record) => {
				this.setState({
					record
				});
			});
		}
	}

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		const { record } = this.state;
		return <Route.Wrapper busy={record === null}>{record !== null && <Text>{JSON.stringify(record)}</Text>}</Route.Wrapper>;
	}
}
