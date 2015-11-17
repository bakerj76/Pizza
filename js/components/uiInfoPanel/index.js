import './index.css';

import FlagEnum from 'game/FlagEnum';
import InfoLabel from './uiInfoLabel';
import React from 'react';

export default class InfoPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var gameManager = this.props.gameManager;
        var labelFlags = gameManager.labelFlags;

        var timeLabel;
        var pizzaLabel;
        var moneyLabel;
        var deltaLabel;

        if (labelFlags.getFlag(labelFlags.Time)) {

        }

        if (labelFlags.getFlag(labelFlags.PizzaCount)) {
            var pizzaCount = gameManager.pizzaCount + ' pizza' +
                (gameManager.pizzaCount == 1 ? '' : 's');

            pizzaLabel = <InfoLabel enabled={true}
                value={pizzaCount} />;
        }

        return (
            <div id='pizza-info' className='panel-list'>
                {pizzaLabel}
            </div>
        );
    }
}
