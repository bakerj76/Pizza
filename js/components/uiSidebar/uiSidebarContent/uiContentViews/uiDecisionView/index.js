import '../index.css';
import './index.css';

import Decision from './uiDecision';
import React from 'react';

export default class DecisionView extends React.Component {
    createDecision(name, decision) {
        return (
            <Decision key={name} name={name} decision={decision}
                onDecide={this.props.gameManager.onDecide} />
        );
    }

    render() {
        var gameManager = this.props.gameManager;
        var pendingDecisions = gameManager.decisionManager.pendingDecisions;

        return (
            <div id='view'>
                <h1>Decisions</h1>
                <div id='decisions'>
                    {Object.keys(pendingDecisions).map((key) =>
                        this.createDecision(key, pendingDecisions[key]))}
                </div>
            </div>
        );
    }
}
