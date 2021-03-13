import React from "react";
import { Text } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { Route } from "../../components";
import { IDataCollection } from "../../types/data";
import { IReduxStore } from "../../types/redux";
import strings from "../../utils/strings";

interface IStatsProps extends DispatchProp {
	collection: IDataCollection[];
}

/**
 * Statistika
 */
class Stats extends Route.Content<IStatsProps> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		return (
			<Route.Wrapper
				title={strings("statsTitle")}
				features={{
					back: true,
					menu: {
						enabled: true
					}
				}}
				scrollable={true}
			>
				<Text>statistika</Text>
			</Route.Wrapper>
		);
	}
}

/*
- statistiku zkolektovat v reduxu? (nejaky "interni" reducer?)
top staty
nejvyssi cena
nejlepe hodnocene
nejstarsi	
top vyrobce

- pri zadavani noveho rumu zkollektovat existujici hodnoty a nabizet je pres vyskakovaci menu
*/
export default connect((store: IReduxStore) => ({
	collection: store.collection.records
}))(Stats);
