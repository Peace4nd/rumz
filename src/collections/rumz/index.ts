import options from "./options";
import records from "./records";

export default {
	options,
	records
};

export interface ICollectionOptions {
	dram: number;
	color: string[];
	aroma: string[];
	taste: string[];
	cask: string[];
	mandatory: string[];
}

export interface ICollectionRecord {
	id: string;
	name: string;
	subname: string;
	purchased: string;
	image: string;
	origin: string;
	manufacturer: string;
	alcohol: number;
	price: number;
	volume: number;
	notes: string;
	rating: number;
	ripening: [lowest: number, highest: number];
	cask: string[];
	color: string[];
	aroma: string[];
	taste: string[];
	drunk: number;
	bottle: number;
}
