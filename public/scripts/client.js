/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    //   const tweetData = [
    //     {
    //       "user": {
    //         "name": "Newton",
    //         "avatars": "https://i.imgur.com/73hZDYK.png"
    //         ,
    //         "handle": "@SirIsaac"
    //       },
    //       "content": {
    //         "text": "If I have seen further it is by standing on the shoulders of giants"
    //       },
    //       "created_at": 1461116232227
    //     },
    //     {
    //       "user": {
    //         "name": "Descartes",
    //         "avatars": "https://i.imgur.com/nlhLi3I.png",
    //         "handle": "@rd" },
    //       "content": {
    //         "text": "Je pense , donc je suis"
    //       },
    //       "created_at": 1461113959088
    //     }
    //   ]
    
    
      const renderTweets = function(tweets) {
        // loops through tweets
        for (let tweet in tweets) {
        // calls createTweetElement for each tweet
            let $newTweet = createTweetElement(tweets[tweet]);
        // takes return value and appends it to the tweets container
            $('.tweet-container').append($newTweet);
        }
      }
    
      const loadTweets = () => {
        $.ajax({
        url: '/tweets/',
        method: 'GET',
        dataType: 'JSON',
        success : (data) => {
            console.info("Success!");
            $('.tweet').empty();
            renderTweets(data);
        },
        failure: err => {
            console.log(err);
        }
      })
      }
    
      loadTweets();
      
      const createTweetElement = function(tweet) {
        let $tweet = /* Your code for creating the tweet element */ `
        <section class="tweet-container">
        <article class="tweet">
              <header class="tweet-header">
              <img class="tweet-img" src="${tweet.user.avatars.small}"> 
               <div>
              <p class="tweet-name">${tweet.user.name}</p>
            </div>
                 <br />
                <p class="tweet-handle">${tweet.user.handle}</p>
               </header>
               <p class="tweet-message">${tweet.content.text}</p>
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
        return $tweet;
      }
      
    
    $(".tweet-form").on("submit", function(e) {
        console.log('Success!')
        e.preventDefault();
        console.log( $( this ).serialize() );
        $.ajax({
            url: '/tweets/',
            method: 'POST',
            data: $( this ).serialize()
        })
        .done((results) => {
            console.log(results); // array of objects
        })
      });
    })
