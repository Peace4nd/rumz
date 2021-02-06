import React from "react";
import { Text } from "react-native";
import { Route } from "../../components";
import { ICollectionRecord } from "../../types/collection";
import { collection } from "../../utils/storage";

interface IOverviewDetailState {
	record: ICollectionRecord;
}

export default class OverviewDetail extends Route.Content<unknown, IOverviewDetailState, { id: string }> {
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

	public render(): JSX.Element {
		return (
			<Route.Wrapper header={{ title: this.state.record?.name }}>
				<Text>{JSON.stringify(this.state.record)}</Text>
			</Route.Wrapper>
		);
	}
}
