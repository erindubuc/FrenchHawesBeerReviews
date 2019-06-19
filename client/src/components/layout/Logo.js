import React, { Component } from 'react';
import white_logo from '../../img/white_logo.png';

class Logo extends Component {
  /*
  constructor() {
    super();
    this.state = {
      width: 209,
      height: 67
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  
  constructor() {
    super();
    this.state = {
      width:  800,
      height: 182
    }
  }

  /**
   * Calculate & Update state of new dimensions
   */

  /*
 updateDimensions() {
   if (window.innerWidth < 500) {
     this.setState({ width: 209, height: 67 });
   } else {
     let update_width = window.innerWidth - 1000;
     let update_height = Math.round(update_width / 3);
     this.setState({ width: update_width, height: update_height });
   }
 }

 /**
  * Add event listener
  */

  /*
 componentDidMount() {
   this.updateDimensions();
   window.addEventListener("resize", this.updateDimensions);
 }

 /**
  * Remove event listener
  */

  /*
 componentWillUnmount() {
   window.removeEventListener("resize", this.updateDimensions);
 }
*/
  render() {
    return (
      <img src={white_logo} alt="Logo" width={250} height={80} mode="fit" />

    );




    /*
    render() {
      return (
        <img src={white_logo} alt="Logo" height="50%" width="50%" />
      )
      */
  }


}

export default Logo;