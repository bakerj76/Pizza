import './index.css';

import InfoLabel from './uiInfoLabel';
import React from 'react';

export default class InfoPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var timeLabel;
        var pizzaLabel;
        var moneyLabel;
        var deltaLabel;

        var pizzaCount = this.props.pizzaCount + ' pizza' +
            (this.props.pizzaCount == 1 ? '' : 's');

        if (this.props.gameManager) {

        }

        return (
            <div id='pizza-info' className='panel-list'>
                <InfoLabel enabled={true}
                    value={pizzaCount} />
            </div>
        );
    }
}
