import data from 'decisions.json';

export default class DecisionManager {
    constructor() {
        /**
         * The next decisions to check game parameters against.
         * @type {Array}
         */
        this.activeDecisions = {};
        this.completedDecisions = [];
        this.findActiveDecisions();
    }

    /**
     * Sets up the active decisions.
     */
    findActiveDecisions() {
        // Loop through all missions,
        for (let key in data) {
            let value = data[key];
            let parentDecisions = value.parentDecisions;

            // Skip the decision if it's already active.
            if (value.active === true) {
                continue;
            }

            // If a mission has no parents, add it.
            if (!parentDecisions) {
                this.addActiveDecision(key, value);
            } else {
                // See if we meet the tree requirements of this decision
                for (let i = 0; i < parentDecisions.length; i++) {
                    var requirement = parentDecisions[i];
                    if (this.completedDecisions.indexOf(requirement) === -1) {
                        return;
                    }
                }
                this.addActiveDecision(key, value);
            }
        }
    }

    /**
     * Adds a decision to the active decision dictionary.
     * @param {string}   name     The name of the decision (key in data).
     * @param {Decision} decision The decision json object.
     */
    addActiveDecision(name, decision) {
        this.activeDecisions[name] = decision;
        decision.active = true;
        console.log('Adding Decision: ' + name);
    }

    /**
     * Checks to see if any active decisions are completed/failed.
     */
    checkActiveDecisions(gameManager) {
        // Did we complete at least one decision?
        var completed = false;

        // Go through the active decisions.
        for (let decisionName in this.activeDecisions) {
            let decision = this.activeDecisions[decisionName];

            // If the game currently meets the requirements,
            if (decision.pizzaRequirement >= gameManager.pizzaCount) {
                // Put it in the deleted array and remove it from active.
                this.completedDecisions.push(decisionName);
                delete this.activeDecisions[decisionName];
                console.log('Decision completed: ' + decisionName);

                completed = true;
            }
        }

        // If we completed a decision, find the new active decisions.
        if (completed) {
            this.findActiveDecisions();
        }
    }
}
