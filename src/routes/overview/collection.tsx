import React from "react";
import { Collection } from "../../components";
import { IHeader } from "../../components/header";
import { ICollectionRecord } from "../../types/collection";
import { collection } from "../../utils/storage";
import strings from "../../utils/strings";
import BaseRoute from "../base";

interface IOverviewCollectionState {
	records: ICollectionRecord[];
}

/**
 * Prehled
 */
export default class OverviewCollection extends BaseRoute<unknown, IOverviewCollectionState> {
	/**
	 * Vychozi stav
	 */
	public state = {
		records: []
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		collection.read().then((records) => {
			this.setState({
				records
			});
		});
	}

	/**
	 * Vlastni obsah routy
	 *
	 * @returns {JSX.Element} Element
	 */
	protected setHeaderProps(): IHeader {
		return {
			title: strings("headerMain")
		};
	}

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	protected renderRoute(): JSX.Element {
		return <Collection records={this.state.records} />;
	}
}

/**
[
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
						},
						{
							added: moment(),
							country: "gt",
							id: "5",
							label: "El Pasador de Oro XO",
							source: require("../../_img/el-pasador.png")
						},
						{
							added: moment(),
							country: "gt",
							id: "6",
							label: "Zacapa Centenario",
							source: require("../../_img/zacapa.png")
						},
						{
							added: moment(),
							country: "ph",
							id: "7",
							label: "Don Papa",
							source: require("../../_img/donpapa.png")
						},
						{
							added: moment(),
							country: "bb",
							id: "8",
							label: "Plantation XO",
							source: require("../../_img/plantation.png")
						},
						{
							added: moment(),
							country: "gt",
							id: "9",
							label: "El Pasador de Oro XO",
							source: require("../../_img/el-pasador.png")
						},
						{
							added: moment(),
							country: "gt",
							id: "10",
							label: "Zacapa Centenario",
							source: require("../../_img/zacapa.png")
						},
						{
							added: moment(),
							country: "ph",
							id: "11",
							label: "Don Papa",
							source: require("../../_img/donpapa.png")
						},
						{
							added: moment(),
							country: "bb",
							id: "12",
							label: "Plantation XO",
							source: require("../../_img/plantation.png")
						}
					]
 */
