import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text } from "react-native";
import { Route } from "../../components";
import { ICollectionRecord } from "../../types/collection";
import { collection } from "../../utils/storage";

interface IOverviewDetailState {
	record: ICollectionRecord;
}

interface IOverviewDetailParams {
	id: string;
}

/**
 * Detail
 */
export default class OverviewDetail extends Route.Content<unknown, IOverviewDetailState, IOverviewDetailParams> {
	/**
	 * Vychozi stav
	 */
	public state: IOverviewDetailState = {
		record: null
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		collection.find(this.getParamValue("id")).then((record) => {
			this.setState({
				record
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
		const { record } = this.state;
		// sestaveni  vraceni
		return (
			<Route.Wrapper
				busy={record === null}
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
