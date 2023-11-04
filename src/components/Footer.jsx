//Footer.jsx
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';

const Footer = () => {
  return (
    <footer className="footer-container text-light text-center py-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 order-md-1">
            <p className="mb-0">&copy; 2023 SHANMUGAM R. All rights reserved.</p>
          </div>
          <div className="col-12 col-md-6 text-md-end order-md-2 mt-3 mt-md-0">
            <div className="d-flex justify-content-center justify-content-md-end">
              <a href="https://www.linkedin.com/in/shanmugamrskfamily" className="text-light me-3">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href="https://github.com/Shanmugamrskfamily" className="text-light">
                <i className="fab fa-github fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;