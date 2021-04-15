import React from "react";
import { Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";
import { Route } from "../../components";
import { Measurement } from "../../styles";
import { IDataCollection } from "../../types/data";
import { IReduxDispatch, IReduxStore } from "../../types/redux";
import { calculateStats } from "../../utils/stats";
import strings from "../../utils/strings";

interface IStatsProps extends IReduxDispatch {
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
		const xxx = calculateStats(this.props.collection);
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
				<Text>{JSON.stringify(xxx, null, 4)}</Text>

				<LineChart
					data={{
						labels: ["January", "February", "March", "April", "May", "June"],
						datasets: [
							{
								data: [
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100
								]
							}
						]
					}}
					width={Dimensions.get("window").width - 4 * Measurement.Padding} // from react-native
					height={220}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: "#e26a00",
						backgroundGradientFrom: "#fb8c00",
						backgroundGradientTo: "#ffa726",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16
						},
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#ffa726"
						}
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16
					}}
				/>
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
