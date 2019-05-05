import React, { Component } from 'react';

export class Icon extends Component {
    static displayName = Icon.name;

    render() {
        return (
            <span class="logo">
                <a href="/">
                    <img src="/white_logo.png" />
                </a>
            </span>
        );
    }
}

