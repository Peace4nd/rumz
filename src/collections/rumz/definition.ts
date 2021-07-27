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
import { ICollectionRecord } from "./types";

export default {
	actions: null,
	fields: [
		{
			icon: faImage,
			label: "Obrázek",
			name: "image",
			type: "image"
		},
		{
			icon: faPencilAlt,
			label: "Název",
			name: "name",
			type: "text"
		},
		{
			icon: faPencilAlt,
			label: "Doplňkové pojmenování",
			name: "subname",
			type: "text"
		},
		{
			icon: faIndustry,
			label: "Výrobce",
			name: "manufacturer",
			// predefined: predefined.manufacturer,
			type: "text"
		},
		{
			icon: faWineBottle,
			label: "Objem",
			name: "volume",
			type: "number"
		},
		{
			icon: faPercentage,
			label: "Alkohol",
			name: "alcohol",
			type: "number",
			unit: "%"
		},
		{
			icon: faPalette,
			// items: options.properties.color,
			label: "Barva",
			name: "color",
			type: "tags"
		},
		{
			icon: faFlask,
			// items: options.properties.aroma,
			label: "Aroma",
			name: "aroma",
			type: "tags"
		},
		{
			icon: faGlassCheers,
			// items: options.properties.taste,
			label: "Chuť",
			name: "taste",
			type: "tags"
		},
		{
			icon: faBox,
			// items: options.cask,
			label: "Typ sudu",
			name: "cask",
			type: "tags"
		},
		{
			icon: faEuroSign,
			label: "Cena",
			name: "price",
			type: "number",
			unit: "Kč"
		},
		{
			icon: [faLongArrowAltDown, faLongArrowAltUp],
			label: ["Nejkratší zrání", "Nejdelší zrání"],
			name: "ripening",
			type: "range"
		},
		{
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
			icon: faCalendar,
			label: "Zakoupeno",
			name: "purchased",
			type: "date"
		},
		{
			icon: faSmile,
			label: "Hodnocení",
			name: "rating",
			type: "rating"
		},
		{
			icon: faComments,
			label: "Poznámky",
			lines: 5,
			name: "notes",
			type: "multiline"
		},
		{
			defaults: () => v4(),
			name: "id",
			type: "hidden"
		},
		{
			defaults: () => 0,
			name: "drunk",
			type: "hidden"
		}
	],
	labels: {
		create: "createTitle",
		save: {
			done: "Rum byl přidán do kolekce",
			error: "Při ukládání nastala chyba. Některá pole nejsou vyplněná!"
		},
		title: "Rumotéka"
	},
	name: "rumz"
} as ICollection<ICollectionRecord>;
