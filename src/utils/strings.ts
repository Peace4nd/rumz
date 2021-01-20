import data from "../../locale/main.json";

/**
 * Prekladovy retezec
 *
 * @param {keyof typeof data} key Retezec
 * @returns {string} Text
 */
export default function strings(key: keyof typeof data): string {
	return data[key];
}
