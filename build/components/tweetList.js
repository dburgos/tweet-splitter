/** @jsx React.DOM */
var TweetList = React.createClass({displayName: "TweetList",
  getInitialState: function() {
    return {
      tweetLength: 140,
      numberSplit: ") ",
      params: {
        text: "",
        showNumber: false
      },
      data: {
        tweets: []
      }
    };
  },

  componentDidMount: function() {
    EventSystem.subscribe('input.text.change', this.updateParams);
    EventSystem.subscribe('input.check.show', this.updateParams);
  },

  updateParams: function(params) {
    this.state.params[params.key] = params.value;
    this.updateList();
  },

  updateList: function() {
    var self = this;
    self.generateTweets(function(err, tweets) {
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

  generateTweets: function(callback) {
    var output = [];
    var text   = this.state.params.text;
    for(var i=1; text.length != 0; i++) {
      // Set the max length
      var splitPosition = this.state.tweetLength;

      // If show number, keep in mind its length and the split length
      if(this.state.params.showNumber) {
        splitPosition -= i.toString().length + this.state.numberSplit.length;
      }

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

      // Compose tweet text
      var tweetText = text.substr(0, splitPosition).trim();

      if(this.state.params.showNumber) {
        tweetText = i + this.state.numberSplit + tweetText;
      }

      // Save the tweet
      output.push({
        id: i,
        text: tweetText
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