import React from 'react';

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <div className="row">
        <div className="col-md-6 text-right">
          &copy; {new Date().getFullYear()} French Hawes Beer Reviews
    </div>
        <div className="col-md-6">
          <a
            className="text-white"
            rel="noopener noreferrer"
            target="_blank" id="footer-link-twitter" href="https://twitter.com"
          >
            <i className="fab fa-twitter white-text mr-4" />
          </a>

          <a
            className="text-white"
            rel="noopener noreferrer"
            target="_blank" id="footer-link-facebook" href="https://facebook.com"
          >
            <i className="fab fa-facebook-f white-text mr-4" />
          </a>
          <a
            className="text-white"
            rel="noopener noreferrer"
            target="_blank" id="footer-link-linkedin" href="https://linkedin.com"
          >
            <i className="fab fa-linkedin white-text mr-4" />
          </a>
        </div>
      </div>

    </footer>

  )
}