import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Route } from "../../components";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxStore } from "../../types/redux";

interface ICreateUpdateProps {
	collection: IDataCollection[];
	options: IDataOptions;
}

interface ICreateUpdateParams {
	id: string;
}

/**
 * Editace
 */
class CreateUpdate extends Route.Content<ICreateUpdateProps, unknown, ICreateUpdateParams> {
	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { collection } = this.props;
		// nalezeni zaznamu
		const record = collection.find((col) => col.id === this.getParamValue("id"));
		// sestaveni a vraceni
		return (
			<Route.Wrapper>
				<Text>{JSON.stringify(record)}</Text>
			</Route.Wrapper>
		);
	}
}

export default connect((store: IReduxStore) => ({
	collection: store.collection.records,
	options: store.options.values
}))(CreateUpdate);
