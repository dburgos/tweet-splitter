/** @jsx React.DOM */
var TweetList = React.createClass({displayName: "TweetList",
  getInitialState: function() {
    return {
      tweetLength: 140,
      data: {
        tweets: []
      }
    };
  },

  componentDidMount: function() {
    EventSystem.subscribe('input.text.change', this.updateList);
  },

  updateList: function(text) {
    var self = this;
    self.generateTweets(text, function(err, tweets) {
      if(err) {
        tweets = [];
      }
      self.setState({
        data: {
          tweets: tweets
        }
      });
    });
  },

  generateTweets: function(text, callback) {
    var output = [];
    for(var i=1; text.length != 0; i++) {
      // Set the max length
      var splitPosition = this.state.tweetLength;

      // If text is larger than a tweet,
      // Don't cut a word
      var isCutting = text.length > this.state.tweetLength;
      if(isCutting) {
        var hasWords = text.split(' ').length > 2;
        if (hasWords) {
          // Find the last space
          splitPosition = text.substr(0, splitPosition).lastIndexOf(' ');
        }
      }

      // Save the tweet
      output.push({
        id: i,
        text: text.substr(0, splitPosition).trim()
      });

      // Cut
      text = text.substr(splitPosition);
    }
    callback(null, output);
  },

  render: function() {
    var data = this.state.data;
    if (data) {
      var hasTweets = data.tweets && data.tweets.length > 0;
      if (hasTweets) {
        return React.createElement("ul", {class: "list-group"},

              data.tweets.map(function(tweet) {
                return React.createElement("li", {key: tweet.id, className: "list-group-item"},
                          React.createElement("h1", null, tweet.id),
                          React.createElement("span", {className: "pull-left"}, tweet.text),
                          React.createElement("a", {href: "https://twitter.com/intent/tweet?text="+encodeURIComponent(tweet.text),
                              className: "twitter-share-button pull-right",
                              "data-size": "large",
                              "data-count": "none"}, "Tweet")
                        )
              })

          )
      }
    }
    return false;
  }
});

React.render(
  React.createElement(TweetList, null),
  document.getElementById("tweets")
);