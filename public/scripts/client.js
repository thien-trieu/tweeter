/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const createTweetElement = function(object) {
  
  const markup = `
  <article class="tweets">
  <header class="tweetHeader">
    <div class="tweeterProfile">
      <img class="avatar" src="${object.user.avatars}">
      <h5 class="tweeterName">${object.user.name}</h5>
    </div>
    <div class="tweetUser">
      <h4 class="userName">${object.user.handle}</h4>
    </div>
  </header>
    <article class="tweetText">${object.content.text}</article>
  <hr>
  <footer class="tweetFooter">
    <h6>${object.created_at}</h6>
    <div>
      <i class="fa-solid fa-flag icons"></i>
      <i class="fa-sharp fa-solid fa-retweet icons"></i>
      <i class="fa-solid fa-heart icons"></i>
    </div>
  </footer>
</article>`;

  return markup;
};

const $tweet = createTweetElement(tweetData);



$(document).ready(function() {
  $('#tweets-container').append($tweet);
});