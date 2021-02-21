import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Route } from "../../components";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxStore } from "../../types/redux";

interface IOverviewDetailProps {
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
		const { collection } = this.props;
		// nalezeni zaznamu
		const record = collection.find((col) => col.id === this.getParamValue("id"));
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				header={{
					actionLeft: {
						icon: faTimes,
						onPress: this.back
					},
					actionRight: {
						icon: faPencilAlt,
						onPress: () => this.redirect("/create/:id", { id: record.id })
					},
					title: record?.name
				}}
			>
				<Text>{JSON.stringify(record)}</Text>
			</Route.Wrapper>
		);
	}
}

export default connect((store: IReduxStore) => ({
	collection: store.collection.records,
	options: store.options.values
}))(OverviewDetail);
