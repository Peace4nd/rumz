import fs from "fs";
import fetch from "node-fetch";
import path from "path";

fetch("https://raw.githubusercontent.com/msigut/ISO.3166.CZ/master/data/wiki.countries.csv")
	.then((response) => {
		return response.text();
	})
	.then((data) => {
		// definice
		const codes: string[] = [];
		// parsovani
		const rows = data.split("\n").map((row) => row.trim());
		const noOfRows = rows.length;
		// krokovani radku
		for (let i = 0; i < noOfRows; i++) {
			// preskocit prvni a posledni radek
			if (i === 0 || i === noOfRows - 1) {
				continue;
			}
			// sestaveni
			const columns = rows[i].split(";").map((column) => column.trim());
			const code = columns[2].toLowerCase();
			codes.push(`\t${code}: {\n\t\tflag: require("svg-country-flags/svg/${code}.svg"),\n\t\tname: "${columns[3]}"\n\t}`);
		}
		// zapis
		fs.writeFileSync(
			path.resolve(__dirname, "../src/utils/country.ts"),
			`/* eslint-disable @typescript-eslint/no-unsafe-assignment, sort-keys */

import { FunctionComponent } from "react";
import { SvgProps } from "react-native-svg";

export type ICountryDefinition = Record<
	string,
	{
		name: string;
		flag: {
			default: FunctionComponent<SvgProps>;
		};
	}
>;

export default {
${codes.join(",\n")}
} as ICountryDefinition;
`
		);
	});
