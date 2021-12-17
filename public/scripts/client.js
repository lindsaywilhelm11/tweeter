// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1639534560699
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd"
//       },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1639620960699
//     }
//   ]

const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

const createTweetElement = (data) => {

    let $tweet = `
    <section class="tweet-container">
    <article class="tweet">
          <header class="tweet-header">
          <img class="tweet-img" src="${data.user.avatars}"> 
           <div>
          <p class="tweet-name">${data.user.name}</p>
        </div>
             <br />
            <p class="tweet-handle">${data.user.handle}</p>
           </header>
           <p class="tweet-message">${escape(data.content.text)}</p>
          <hr>
          <footer class="tweet-footer">
             <p class="timeago">${(timeago.format(data.created_at))}</p>
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

    return $tweet;
  }

const renderTweets = (tweets) => {
    for (let tweet in tweets) {
      let $newTweet = createTweetElement(tweets[tweet]);
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
        url: '/tweets',
        data: data
      })
        .done(() => {
          loadTweets();
      })
        .fail((err) => {
          console.log(err)

        $(".tweet-text").val("");
        $(".counter").text(140);
    })
  }); 

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'
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




