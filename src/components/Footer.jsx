import React from "react";
import "./Footer.css"; // Ensure the CSS file is correctly referenced

export const Footer = () => {
  return (
    <footer className="site-footer">
      <section className="social-icons">
        <a href="https://github.com/Gocoderunav" aria-label="GitHub"><i className="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/gaurav-gangwar/?originalSubdomain=in" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
        <a href="https://www.facebook.com/" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
        <a href="https://www.instagram.com/gau_rawww/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        <a href="https://x.com/Gaurav_Gangwarr" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
      </section>
    </footer>
  );
};


