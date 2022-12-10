$(document).ready(function() {

  const $input = $('#tweet-text');
  const $counter = $('.counter');

  $input.bind('keydown, keyup', function(e) {

    const $tweetLength = $input.val().length;

      $counter.text(140 - $tweetLength);

      if ($tweetLength > 140) {
        $counter.addClass('counterRed');
      } else {
        $counter.removeClass('counterRed');
      }

  });

});