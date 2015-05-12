/** @jsx React.DOM */
var TweetTextarea = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    };
  },

  handleChange: function(e) {
    EventSystem.publish('input.text.change', e.target.value);
  },

  render: function() {
    return <textarea value={this.state.value}
              placeholder="Write or paste here"
              onChange={this.handleChange} />;
  }
});

React.render(
  <TweetTextarea />,
  document.getElementById("input")
);