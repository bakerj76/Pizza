/**
 * Contains information for an item label.
 */
export default class InfoItem {
	/**
	 * Creates an object that contains information for an item label.
	 * @param  {string} name    The name to display on the label.
	 * @param  {number} value   The value to display next to the label.
	 */
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}
