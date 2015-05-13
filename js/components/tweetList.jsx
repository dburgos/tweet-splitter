/** @jsx React.DOM */
var TweetList = React.createClass({
  getInitialState: function() {
    return {
      data: {
        tweets: []
      }
    };
  },

  componentDidMount: function() {
    EventSystem.subscribe('input.text.change', this.updateList);
  },

  updateList: function() {
    this.setState({
      data: {
        tweets: [
          // TODO
        ]
      }
    });
  },

  render: function() {
    var data = this.state.data;
    if (data) {
      var hasTweets = data.tweets && data.tweets.length > 0;
      if (hasTweets) {
        return <ul className="tweets">
            {
              data.tweets.map(function(tweet) {
                return <li key={tweet.id}>{tweet.text}</li>
              })
            }
          </ul>
      }
    }
    return false;
  }
});

React.render(
  <TweetList />,
  document.getElementById("tweets")
);