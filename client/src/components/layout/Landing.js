import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div className="container-fluid landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-4 mb-4">Drink Good Beer With Good Friends</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;