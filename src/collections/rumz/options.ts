import { faBox, faFlask, faGlassCheers, faGlassWhiskey, faListUl, faPalette } from "@fortawesome/free-solid-svg-icons";
import { ICollection } from "../../types/collection";

export default {
	fields: [
		{
			description: "Objen jednoho panáku",
			icon: faGlassWhiskey,
			label: "Objem panáku",
			name: "dram",
			type: "number",
			unit: "ml"
		},
		{
			description: "Preddefinované barvy",
			icon: faPalette,
			label: "Barva",
			name: "color",
			type: "tags"
		},
		{
			description: "Preddefinovaná aromata",
			icon: faFlask,
			label: "Aroma",
			name: "aroma",
			type: "tags"
		},
		{
			description: "Preddefinované choťové vlastnosti",
			icon: faGlassCheers,
			label: "Chuť",
			name: "taste",
			type: "tags"
		},
		{
			description: "Typ sudů",
			icon: faBox,
			label: "Typ sudu",
			name: "cask",
			type: "tags"
		},
		{
			description: "Povinné položky v záznamu",
			icon: faListUl,
			label: null,
			name: "mandatory",
			type: "tags"
		}
	]
} as ICollection<"dram" | "color" | "aroma" | "taste" | "cask" | "mandatory">;
