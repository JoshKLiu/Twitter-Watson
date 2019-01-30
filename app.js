var express = require('express');
var Twitter = require('twitter')

var app = express();

var T = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '357766764-',
    access_token_secret: ''
});


var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
    version: '2018-06-15',
    iam_apikey: 'YWf16kT4WBqaFwFmDh7mFgWxKOkDKYArk_a4KQKMCOlJ',
    url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
  });


var paramsTwitter = {
    q: 'Nike Colin Kaepernick',
    count: 50,
    tweet_mode: 'extended'
}


T.get('search/tweets', paramsTwitter).then(function(tweets) {
    var tweet = tweets.statuses[0].full_text;
    console.log(tweets);
    return tweet;
  })

  .then(function(tweet) {

    var toneParams = {
      'tone_input': { 'text' : 'That was an amazing message in an amazing commercial @Kaepernick7 @Nike' },
      'content_type': 'application/json'
    };

    toneAnalyzer.tone(toneParams, function(error, toneAnalysis) {
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.stringify(toneAnalysis, null, 2));
      }
    });
  });
