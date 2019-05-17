import React, { Component } from 'react';
import logo from './white_logo.png';

export class Icon extends Component {
    static displayName = Icon.name;

    render() {
        return (
            <span class="logo">
                <a href="/">
                    <img src={logo} alt="Logo" />
                </a>
            </span>
        );
    }
}

