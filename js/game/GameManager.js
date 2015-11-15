import FlagEnum from './FlagEnum';
import PizzaApp from 'components/uiPizzaApp';
import DecisionManager from 'game/decisions/DecisionManager';
import React from 'react';
import ReactDOM from 'react-dom';

export default class GameManager {
	constructor() {
		this.decisionManager = new DecisionManager();
		this._pizzaCount = 0;
		this.IconFlags = new FlagEnum('Decisions', 'Finances', 'Standing',
		    'Statistics');
		this.LabelFlags = new FlagEnum('Time', 'PizzaCount', 'Money',
		    'DeltaMoney');

		/**
		 * Callback for when the user clicks the pizza button.
		 */
		this.onClick = () => {
			this._onClick();
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
			this.IconFlags.setFlag(this.IconFlags.Decisions);
		}
	}


	/**
	 * Rerenders the PizzaApp component.
	 */
	draw() {
		ReactDOM.render(<PizzaApp gameManager={this} />,
	        document.getElementById('content'));
	}
}
