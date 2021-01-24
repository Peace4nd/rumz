import React from "react";
import { Text } from "react-native";
import { IHeader } from "../../components/header";
import { ICollectionRecord } from "../../types/collection";
import { collection } from "../../utils/storage";
import BaseRoute from "../base";

interface IOverviewDetailState {
	record: ICollectionRecord;
}

export default class OverviewDetail extends BaseRoute<unknown, IOverviewDetailState, { id: string }> {
	public state: IOverviewDetailState = {
		record: null
	};

	public componentDidMount(): void {
		collection.find(this.props.match.params.id).then((record) => {
			this.setState({
				record
			});
		});
	}

	protected setHeaderProps(): IHeader {
		return {
			title: this.state.record?.name
		};
	}
	protected renderRoute(): JSX.Element {
		return <Text>{JSON.stringify(this.state.record)}</Text>;
	}
}
