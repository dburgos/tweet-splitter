/** @jsx React.DOM */
var CheckTweetNumber = React.createClass({
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
    return  <label className="checkbox">
              <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.handleChange} />
              <span>Show tweet numbers</span>
            </label>;
  }
});

React.render(
  <CheckTweetNumber />,
  document.getElementById("options")
);