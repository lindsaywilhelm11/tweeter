

$(document).ready(function() {
    $('.tweet-text').change(updateCountdown);
    $('.tweet-text').keyup(updateCountdown);
  });

  function updateCountdown() {
    let remaining = 140 - jQuery('.tweet-text').val().length;
    jQuery('.counter').text(remaining);
  }

