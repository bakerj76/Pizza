import './index.css';

import React from 'react';

export default class Decision extends React.Component {
    constructor(props) {
        super(props);

        this.createButtons = this.createButtons.bind(this);
    }

    createButtons(button, index) {
        var onDecide = this.props.onDecide;
        var name = this.props.name;

        return (
            <button key={index} onClick={(e) => onDecide(name, index)}>
                {button}
            </button>
        );
    }

    render() {
        var name = this.props.name;
        var decision = this.props.decision;

        return (
            <div className='decision'>
                <h2>{name}</h2>
                <p>{decision.text}</p>
                <div className={'buttons ' + decision.style}>
                    {decision.buttons.map(this.createButtons)}
                </div>
            </div>
        );
    }
}
