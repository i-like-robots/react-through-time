import React from "react";

function Footer() {
  return (
    <footer className="Footer">
      <p>
        <small>
          © Matt Hinchliffe {new Date().getUTCFullYear()}, view the
          <a href="https://github.com/i-like-robots/react-through-time">
            source code on GitHub
          </a>
          .
        </small>
      </p>
    </footer>
  );
}

export default Footer;
