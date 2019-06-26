import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';


class Navbar extends Component {
  render() {
    return (
      <nav className="navbar mb-4">
        <div className="row">
          <button
            className="btn shadow-none"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <Logo />
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">

            <ul className="navbar-nav ml-5">

              <li className="nav-item">
                <a className="nav-link" rel="noopener noreferrer" href="/">
                  Home</a>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/reviews">
                  Reviews
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  Blog
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" rel="noopener noreferrer" href="https://www.redbubble.com/people/FrenchHawes/shop" target="_blank">
                  Shop Our Store
                </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;