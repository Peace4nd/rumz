import { faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import React from "react";
import { Button, Collection } from "../../components";
import BaseRoute from "../base";

export default class Home extends BaseRoute {
	protected renderRoute(): JSX.Element {
		return (
			<React.Fragment>
				<Collection
					items={[
						{
							added: moment(),
							country: "gt",
							id: "1",
							label: "El Pasador de Oro XO",
							source: require("../../_img/el-pasador.png")
						},
						{
							added: moment(),
							country: "gt",
							id: "2",
							label: "Zacapa Centenario",
							source: require("../../_img/zacapa.png")
						},
						{
							added: moment(),
							country: "ph",
							id: "3",
							label: "Don Papa",
							source: require("../../_img/donpapa.png")
						},
						{
							added: moment(),
							country: "bb",
							id: "4",
							label: "Plantation XO",
							source: require("../../_img/plantation.png")
						}
					]}
				/>
				<Button icon={faPlus} route="/add" />
			</React.Fragment>
		);
	}
}
