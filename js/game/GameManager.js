import FlagEnum from './FlagEnum';
import PizzaApp from 'components/uiPizzaApp';
import DecisionManager from 'game/decisions/DecisionManager';
import React from 'react';
import ReactDOM from 'react-dom';

export default class GameManager {
	constructor() {
		this.decisionManager = new DecisionManager();
		this._pizzaCount = 0;
		this.iconFlags = new FlagEnum('Decisions', 'Finances', 'Standing',
		    'Statistics');
		this.labelFlags = new FlagEnum('Time', 'PizzaCount', 'Money',
		    'DeltaMoney');

		/**
		 * Callback for when the user clicks the pizza button.
		 */
		this.onClick = () => {
			this._onClick();
		};

		/**
		 * Callback when the user makes a decision.
		 * @param  {string} decision The decision name.
		 * @param  {int}    choice   The choice the user made.
		 */
		this.onDecide = (decision, choice) => {
			this._onDecide(decision, choice);
		};
	}

	get pizzaCount() {
		return this._pizzaCount;
	}

	set pizzaCount(value) {
		this._pizzaCount = value;
		this.draw();
		this.decisionManager.checkActiveDecisions(this);
	}

	/**
	 * Starts the game.
	 */
	start() {
		this.draw();
	}

	_onClick() {
		this.pizzaCount++;

		if (this.pizzaCount > 0) {
			this.iconFlags.setFlag(this.iconFlags.Decisions);
			this.labelFlags.setFlag(this.labelFlags.PizzaCount);
		}
	}

	_onDecide(decision, choice) {
		console.log("Decision made: " + decision + ", " + choice);
		this.decisionManager.addCompletedDecision(this, decision, choice);
	}

	/**
	 * Rerenders the PizzaApp component.
	 */
	draw() {
		ReactDOM.render(<PizzaApp gameManager={this} />,
	        document.getElementById('content'));
	}
}
