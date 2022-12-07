/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweet) {
  let $tweet = `
  <article class="tweets">
  <header class="tweetHeader">
    <div class="tweeterProfile">
      <img class="avatar" src="${tweet.user.avatars}">
      <h5 class="tweeterName">${tweet.user.name}</h5>
    </div>
    <div class="tweetUser">
      <h4 class="userName">${tweet.user.handle}</h4>
    </div>
  </header>
    <article class="tweetText">${tweet.content.text}</article>
  <hr>
  <footer class="tweetFooter">
    <h6>${tweet.created_at}</h6>
    <div>
      <i class="fa-solid fa-flag icons"></i>
      <i class="fa-sharp fa-solid fa-retweet icons"></i>
      <i class="fa-solid fa-heart icons"></i>
    </div>
  </footer>
</article>`;

  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {

    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
  return;
};

$(document).ready(function() {

  renderTweets(data);

  $('.tweetForm').submit(function(event) {
    event.preventDefault();

    const tweet = $(this).serialize();

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweet,
      });

  });

});