import React from "react";
import { connect } from "react-redux";
import defined from "../collections";
import { Route, Typography } from "../components";
import { IReduxCollections, IReduxDispatch, IReduxStore } from "../types/redux";
import storage from "../utils/storage";

interface ICollectionsProps extends IReduxDispatch {
	collection: IReduxCollections;
}

/**
 * Nastaveni
 */
class Collections extends Route.Content<ICollectionsProps> {
	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		storage.collections.read().then((data) => {
			console.log(data);
		});
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		// const { backupWorking } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper title={"vyber kolekce"} scrollable={true}>
				{defined.map((def) => {
					return <Typography>{def.title}</Typography>;
				})}
			</Route.Wrapper>
		);
	}
}

export default connect((store: IReduxStore) => ({
	collections: store.collections
}))(Collections);
