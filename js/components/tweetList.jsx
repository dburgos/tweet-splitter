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
    })

  },

  generateTweets: function(text, callback) {
    var output = [];
    for(var i=1; text.length != 0; i++) {
      output.push({
        id: i,
        text: text.substr(0, 140)
      });
      text = text.substr(141);
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