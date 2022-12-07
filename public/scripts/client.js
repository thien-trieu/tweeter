/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Tweet element for each tweet will appear within section#tweet-container
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
  const allTweets = [];

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    allTweets.push($tweet);

  }

  $('#tweets-container').html(allTweets.reverse());

  return;
};


const loadTweets = function() {

  $.ajax({
    type: "GET",
    url: "/tweets",
    success: function(tweet) {
      renderTweets(tweet);
    }
  });

};

$(document).ready(function() {

  loadTweets();

  $('.tweetForm').submit(function(event) {
    event.preventDefault();

    const tweet = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: tweet,
      success: function(data) {
        loadTweets();
      }
    });


  });

  // $('.tweet-btn').on('click', function(){
  //   $('#tweet-text').val('')
  // })

});