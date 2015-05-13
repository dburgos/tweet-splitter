/** @jsx React.DOM */
var TweetList = React.createClass({
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
      output.push({
        id: i,
        text: text.substr(0, this.state.tweetLength).trim()
      });
      text = text.substr(this.state.tweetLength);
    }
    callback(null, output);
  },

  render: function() {
    var data = this.state.data;
    if (data) {
      var hasTweets = data.tweets && data.tweets.length > 0;
      if (hasTweets) {
        return <ul className="tweets">
            {
              data.tweets.map(function(tweet) {
                return <li key={tweet.id}>
                          {tweet.text}
                          <a href={"https://twitter.com/intent/tweet?text="+tweet.text}
                              class="twitter-share-button"
                              data-size="large"
                              data-count="none">Tweet</a>
                        </li>
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