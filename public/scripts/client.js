const tweets = [
//     {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//     ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
// },
// {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
// }
];

const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

const createTweetElement = function(tweet) {
    let $tweet = $("<article>").addClass('tweet') 
    let tweetLayout = `
    <section class="tweet-container">
    <article class="tweet">
          <header class="tweet-header">
          <img class="tweet-img" src="${tweet.user.avatars}"> 
           <div>
          <p class="tweet-name">${tweet.user.name}</p>
        </div>
             <br />
            <p class="tweet-handle">${tweet.user.handle}</p>
           </header>
           <p class="tweet-message">${escape(tweet.content.text)}</p>
          <hr>
          <footer class="tweet-footer">
             <p class="timeago">${(timeago.format(tweet.created_at))}</p>
            <div class="tweet-icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
           </div>
          </footer>
          <br>
        </article>
        </section>
    `;

    let tweetElement = $tweet.append(tweetLayout);
    return tweetElement;
  }

const renderTweets = (tweets) => {
     $('tweet-section').empty();
    for (let tweet in tweets) {
      let $newTweet = createTweetElement(tweet);
      $('.tweet-section').prepend($newTweet);
    }
}



$(document).ready(function() {
    

$('.tweet-form').on('submit', (e) => {
    e.preventDefault();

    $('.error').slideUp();

    let lengthOfTweet = $(".tweet-text").val().length;
    if(lengthOfTweet === 0 || lengthOfTweet === null) {
      $('.error').html("<p>Please add a message before tweeting!</p>")
      $('.error').slideDown('slow');
        return;
    }

    if (lengthOfTweet > 140) {
      $('.error').html("<p>This tweet is way too long! Try again.</p>")
      $('.error').slideDown('slow');
      return;
    } 

    const data = $(this).serialize();
    console.log(data);

    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/tweets',
        data: data
      })
        .done(() => {
          loadTweets();
          $(".tweet-text").val("");
          $(".counter").text(140);
      })
        .fail((err) => {
          console.log(err)
    })
    loadTweets(); 
  }); 
  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    })
    .done((result) => {
        renderTweets(result)
    })
    .fail((err) => {
        console.log(err)
    })
  }
  loadTweets();
})




