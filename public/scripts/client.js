/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escapeXss = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    <article class="tweetText">${escapeXss(tweet.content.text)}</article>
  <hr>
  <footer class="tweetFooter">
    <h6>${timeago.format(tweet.created_at)}</h6>
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
    // check all data for tweets and place each tweet into HTML template
    const $tweet = createTweetElement(tweet);
    allTweets.push($tweet);

  }
  // most recent tweet will appear at top of container
  $('#tweets-container').html(allTweets.reverse());

  return;
};


const loadTweets = function() {
  // gets the tweet db from /tweets route and calls renderTweets to post on to page
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: function(tweet) {
      renderTweets(tweet);
    }
  });
  return;
};

$(document).ready(function() {
  // load existing tweet db
  loadTweets();

  
  // Write a new tweet in nav will focus on input field for text area
  $('.navTweet').click(function() {
    event.preventDefault();
    const newTweetSection = $('.new-tweet')
    if (newTweetSection.is(':hidden')){
      newTweetSection.slideDown('fast')
      newTweetSection.find('#tweet-text').focus()
    }
    $('#tweet-text').focus();
  });
  
  // nav arrow hide/show new tweet section
  $('.next').click(function() {
    event.preventDefault();
    const newTweetSection = $('.new-tweet')
    console.log(newTweetSection)

    if (newTweetSection.is(':visible')){
      newTweetSection.slideUp('fast')
    } else {
      newTweetSection.slideDown('slow')
      newTweetSection.find('#tweet-text').focus()
    }

  });
  
  // scroll button at the botton will appear when window scrolls down
  $(window).scroll(function() {
    if (window.pageYOffset > 100) {
      $('.scrollUp').addClass('active');
    } else {
      $('.scrollUp').removeClass('active');
    }
  });

  // scroll when clicked will scroll page up to text area
  $('.scrollUp').click(function() {
    event.preventDefault();
    const newTweetSection = $('.new-tweet')
    if (newTweetSection.is(':hidden')){
      newTweetSection.slideDown('fast')
      newTweetSection.find('#tweet-text').focus()
    }
    $('#tweet-text').focus();

  });

  // tweet submission
  $('.tweetForm').submit(function(event) {
    // prevent page from re-loading
    event.preventDefault();

    // error if tweet length is invalid, does not send ajax POST request
    const $tweetlength = $('#tweet-text').val().length;
    if ($tweetlength === 0 || $tweetlength > 140) {

      return $('.errorMessage').css('visibility', 'visible');
      // return alert('This field can not be empty or have more than 140 characters')
    }

    // get new tweet data from text area and serialize it
    const $tweet = $(this).serialize();

    // new tweet data POST to /tweet route then call loadTweets to show onto page
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $tweet,
      success: function(data) {

        $('.errorMessage').css('visibility', 'hidden');
        $('.counter').text(140);

        loadTweets();

      }

    });

    // Clear text area after new tweet is posted to page
    this.reset();
    // restart counter at 140

  });

});