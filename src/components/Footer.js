import React from "react";
import PropTypes from "prop-types";

const Footer = (props) => (
  <footer id="footer" style={props.timeout ? { display: "none" } : {}}>
    <p className="copyright">
      &copy; {new Date().getFullYear()} Kyle &amp; Kristin Karpack
    </p>
  </footer>
);

Footer.propTypes = {
  timeout: PropTypes.bool,
};

export default Footer;
