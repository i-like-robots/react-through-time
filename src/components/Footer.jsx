var React = require("react");

var Footer = React.createClass({
  render: function () {
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
  },
});

module.exports = Footer;
