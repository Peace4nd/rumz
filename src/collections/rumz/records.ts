import {
	faBox,
	faCalendar,
	faComments,
	faEuroSign,
	faFlask,
	faGlassCheers,
	faGlobeAmericas,
	faImage,
	faIndustry,
	faLongArrowAltDown,
	faLongArrowAltUp,
	faPalette,
	faPencilAlt,
	faPercentage,
	faSmile,
	faWineBottle
} from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";
import { ICollection } from "../../types/collection";

export default {
	fields: [
		{
			description: "Obrázky lahve",
			icon: faImage,
			label: "Obrázek",
			name: "image",
			type: "image"
		},
		{
			description: "Název rumu",
			icon: faPencilAlt,
			label: "Název",
			name: "name",
			type: "text"
		},
		{
			description: "Doplnující název",
			icon: faPencilAlt,
			label: "Doplňkové pojmenování",
			name: "subname",
			type: "text"
		},
		{
			description: "Výrobce",
			icon: faIndustry,
			label: "Výrobce",
			name: "manufacturer",
			// predefined: predefined.manufacturer,
			type: "text"
		},
		{
			description: "Objem lahve (v ml)",
			icon: faWineBottle,
			label: "Objem",
			name: "volume",
			type: "number"
		},
		{
			description: "Objem alkoholu (v %)",
			icon: faPercentage,
			label: "Alkohol",
			name: "alcohol",
			type: "number",
			unit: "%"
		},
		{
			description: "Barva (zlatá, hnědá, jantarová, ...)",
			icon: faPalette,
			// items: (options) => options.data.color,
			label: "Barva",
			name: "color",
			type: "tags"
		},
		{
			description: "Čichové vlastnosti (tóny kávy, vanilky, ...)",
			icon: faFlask,
			// items: options.properties.aroma,
			label: "Aroma",
			name: "aroma",
			type: "tags"
		},
		{
			description: "Chuťové vlastnosti (pomeranče, vanilka, ...)",
			icon: faGlassCheers,
			// items: options.properties.taste,
			label: "Chuť",
			name: "taste",
			type: "tags"
		},
		{
			description: "Typ sudu ve kterém rum zrál",
			icon: faBox,
			// items: options.cask,
			label: "Typ sudu",
			name: "cask",
			type: "tags"
		},
		{
			description: "Cena (v Kč)",
			icon: faEuroSign,
			label: "Cena",
			name: "price",
			type: "number",
			unit: "Kč"
		},
		{
			description: "Délka zrání (v letech)",
			icon: [faLongArrowAltDown, faLongArrowAltUp],
			label: ["Nejkratší zrání", "Nejdelší zrání"],
			name: "ripening",
			type: "range"
		},
		{
			description: "Země původu (ISO kód)",
			icon: faGlobeAmericas,
			/* items: Object.entries(country).map((entry) => ({
				label: entry[1].name,
				value: entry[0]
			})),*/
			label: "Země původu",
			name: "origin",
			type: "picker"
		},
		{
			description: "Datum zakoupení",
			icon: faCalendar,
			label: "Zakoupeno",
			name: "purchased",
			type: "date"
		},
		{
			description: "Hodnocení (0 - 10)",
			icon: faSmile,
			label: "Hodnocení",
			name: "rating",
			type: "rating"
		},
		{
			description: "Libovolné poznámky",
			icon: faComments,
			label: "Poznámky",
			lines: 5,
			name: "notes",
			type: "multiline"
		},
		{
			description: "Identifikátor",
			name: "id",
			type: "hidden",
			value: () => v4()
		},
		{
			description: "Vypití množství (v ml)",
			name: "drunk",
			type: "hidden",
			value: () => 0
		},
		{
			description: "Počet lahví",
			name: "bottle",
			type: "hidden",
			value: () => 1
		}
	],
	title: "Rumotéka"
} as ICollection<
	| "id"
	| "name"
	| "subname"
	| "purchased"
	| "image"
	| "origin"
	| "manufacturer"
	| "alcohol"
	| "price"
	| "volume"
	| "notes"
	| "rating"
	| "ripening"
	| "cask"
	| "color"
	| "aroma"
	| "taste"
	| "drunk"
	| "bottle"
>;
