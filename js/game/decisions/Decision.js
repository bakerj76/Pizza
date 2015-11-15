class Decision {
	constructor() {
		this.name = null;
		this.parentDecision = null;
		this.moneyRequirement = null;
		this.pizzaRequirement = null;
		this.timeRequirement = null;
		this.flags = {
			true: [],
			false: []
		};
		this.text = null;
		this.buttons = [];
		this.style = "single";
		this.consequenceFunctions = [];
	}
}
