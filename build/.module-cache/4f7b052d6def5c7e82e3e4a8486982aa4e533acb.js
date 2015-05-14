/** @jsx React.DOM */
var CheckTweetNumber = React.createClass({displayName: "CheckTweetNumber",
  getInitialState: function() {
    return {
      checked: false
    };
  },

  handleChange: function(e) {
    EventSystem.publish('input.check.show', {
      key:   "showNumber",
      value: e.target.checked
    });
    this.setState({ checked: e.target.checked });
  },

  render: function() {
    return  React.createElement("label", {className: "checkbox"}, 
              React.createElement("input", {
                type: "checkbox", 
                checked: this.state.checked, 
                onChange: this.handleChange}), 
              React.createElement("span", null, "Show tweet numbers")
            );
  }
});

React.render(
  React.createElement(CheckTweetNumber, null),
  document.getElementById("options")
);