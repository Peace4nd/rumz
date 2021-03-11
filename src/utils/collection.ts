import { IDataCollection } from "../types/data";
import { ILocaleStrings } from "../types/locale";
import country from "./country";
import format from "./format";
import strings from "./strings";

/**
 * Sestaveni sdileneho textu
 *
 * @param {IDataCollection} record Zaznam
 * @returns {string} Sdileny text
 */
export function stringify(record: IDataCollection): string {
	// definice
	let output: string = "";
	// sestaveni
	output += makeLine("createName", format.string(record.name));
	output += makeLine("createManufacturer", format.string(record.manufacturer));
	output += makeLine("createVolume", format.number(record.volume, "ml"));
	output += makeLine("createAlcohol", format.number(record.alcohol, "%"));
	output += makeLine("createColor", format.array(record.color));
	output += makeLine("createAroma", format.array(record.aroma));
	output += makeLine("createTaste", format.array(record.taste));
	output += makeLine("createCask", format.string(record.cask));
	output += makeLine("createPrice", format.number(record.price, "Kč"));
	output += makeLine("createRipening", format.range(record.ripening, strings("overviewRipeningYears")));
	output += makeLine(
		"createOrigin",
		format.item(
			record.origin,
			Object.entries(country).map((entry) => ({ label: entry[1].name, value: entry[0] }))
		)
	);
	output += makeLine("createPurchased", format.date(record.purchased));
	output += makeLine("createRating", format.rating(record.rating));
	output += makeLine("createNotes", format.string(record.notes));
	// vraceni
	return output;
}

/**
 * Sestaveni radku
 *
 * @param {ILocaleStrings} label Popisek
 * @param {string} value Hodnota
 * @returns {string} Radek
 */
function makeLine(label: ILocaleStrings, value: string): string {
	return `${strings(label)}: ${value}\n`;
}
