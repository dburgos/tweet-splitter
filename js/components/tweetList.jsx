/** @jsx React.DOM */
var TweetList = React.createClass({
  getInitialState: function() {
    return {
      data: {
        tweets: []
      }
    };
  },

  render: function() {
    return <ul className="tweets">
        {
          data.tweets.map(function(tweet) {
            return <li key={tweet.id}>{tweet.text}</li>
          })
        }
      </ul>
  }
});

React.render(
  <TweetList />,
  document.getElementById("tweets")
);