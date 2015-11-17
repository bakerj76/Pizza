import data from 'decisions.json';

// Decision structure:
// "Name" :
// {
//     parentDecisions: [{"Name", Choice}, {"Name2", Choice2}],
//     moneyRequirement: required dollar amount,
//     pizzaRequirement: required pizza count,
//     timeRequirement: required time interval,
//     flags:
//     {
//         "true": [flags that must be true to trigger this decision],
//         "false": [flags that must be false to trigger this decision]
//     },
//     "text": the flavor decision description
//     "buttons":
//     [
//         "What the first button says, etc."
//     ],
//     "style": "dismiss, binary, multiple", how should this decision be displayed
//     "consequenceFunctions":
//     [
//         {
//             "name": the first function name,
//             "parameters": [] a list of parameter values
//         }
//     ]
// }

export default class DecisionManager {
    constructor() {
        /**
         * The next decisions to check game parameters against.
         * @type {Array}
         */
        this.activeDecisions = {};
        /**
         * The decisions that need to be completed (yes, no, dismiss).
         * @type {Object}
         */
        this.pendingDecisions = {};
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

                    if (!this._parentsSatisfied(requirement)) {
                        return;
                    }
                }
                this.addActiveDecision(key, value);
            }
        }
    }

    _parentsSatisfied(parentDecision) {
        var name = parentDecision.name;
        var choice = parentDecision.choice;
        var satisfies = false;

        for (let i = 0; i < this.completedDecisions.length; i++) {
            var completed = this.completedDecisions[i];

            if (name === completed.name && choice === completed.choice) {
                satisfies = true;
                break;
            }
        }

        return satisfies;
    }

    /**
     * Adds a decision to the active decision dictionary, which checks if these
     * decisions can be moved into decisions.
     * @param {string}   name     The name of the decision (key in data).
     * @param {Decision} decision The decision json object.
     */
    addActiveDecision(name, decision) {
        this.activeDecisions[name] = decision;
        decision.active = true;
        console.log('Checking for decision: ' + name);
    }

    /**
     * Checks to see if any active decisions are completed/failed.
     * @param {GameManager} The main game manager.
     */
    checkActiveDecisions(gameManager) {
        // Go through the active decisions.
        for (let name in this.activeDecisions) {
            let decision = this.activeDecisions[name];

            // If the game currently meets the requirements, add it to pending.
            if (decision.pizzaRequirement >= gameManager.pizzaCount) {
                this.addPendingDecision(name, decision);
            }
        }
    }

    /**
     * Deletes a decision from active and puts it in pending.
     * @param {string} name       The name of the decision (key in data).
     * @param {Decision} decision The decision json object.
     */
    addPendingDecision(name, decision) {
        this.pendingDecisions[name] = decision;
        delete this.activeDecisions[name];
    }

    addCompletedDecision(gameManager, name, choice) {
        this.completedDecisions.push({name: name, choice: choice});
        delete this.pendingDecisions[name];

        // If we completed a decision, find the new active decisions.
        this.findActiveDecisions();
        gameManager.draw();
    }
}
