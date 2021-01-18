import moment from "moment";
import React from "react";
import { Collection } from "../components";

export default class Home extends React.Component {
	public render(): JSX.Element {
		return (
			<Collection
				items={[
					{
						added: moment(),
						id: "1",
						label: "El Pasador de Oro XO",
						origin: "gt",
						source: require("../../src/_img/el-pasador.png")
					},
					{
						added: moment(),
						id: "2",
						label: "Zacapa Centenario",
						origin: "gt",
						source: require("../../src/_img/zacapa.png")
					},
					{
						added: moment(),
						id: "3",
						label: "Don Papa",
						origin: "ph",
						source: require("../../src/_img/donpapa.png")
					},
					{
						added: moment(),
						id: "4",
						label: "Plantation XO",
						origin: "bb",
						source: require("../../src/_img/plantation.png")
					}
				]}
			/>
		);
	}
}
