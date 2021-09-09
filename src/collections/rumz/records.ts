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
import { ICollectionOptions, ICollectionRecord } from ".";
import { ICollection } from "../../types/collection";
import Country from "../../utils/country";

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
			predefined: (options, records) => {
				const values: string[] = [];
				for (const record of records.data) {
					if (values.indexOf(record.manufacturer) === -1) {
						values.push(record.manufacturer);
					}
				}
				return values;
			},
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
			items: (options) => options.data.color,
			label: "Barva",
			name: "color",
			type: "tags"
		},
		{
			description: "Čichové vlastnosti (tóny kávy, vanilky, ...)",
			icon: faFlask,
			items: (options) => options.data.aroma,
			label: "Aroma",
			name: "aroma",
			type: "tags"
		},
		{
			description: "Chuťové vlastnosti (pomeranče, vanilka, ...)",
			icon: faGlassCheers,
			items: (options) => options.data.taste,
			label: "Chuť",
			name: "taste",
			type: "tags"
		},
		{
			description: "Typ sudu ve kterém rum zrál",
			icon: faBox,
			items: (options) => options.data.cask,
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
			items: Country.picker(),
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
			type: "hidden"
		},
		{
			description: "Vypití množství (v ml)",
			name: "drunk",
			type: "hidden",
			value: 0
		},
		{
			description: "Počet lahví",
			name: "bottle",
			type: "hidden",
			value: 1
		}
	],
	title: "Rumotéka"
} as ICollection<ICollectionRecord, ICollectionOptions>;
