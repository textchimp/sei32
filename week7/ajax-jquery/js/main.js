
$(document).ready(function(){

  console.log('loaded main.js');

  // Load a new bit of trivia from the API
  // every time this button is pressed
  $('#trivia-button').on('click', function(){

    $.ajax({
      url: 'http://numbersapi.com/',
      method: 'get',
      // dataType: 'json',  // default is 'intelligent guess'
    })
    // $.getJSON('http://numbersapi.com/random/trivia?json')
    .done(function( response ){
      console.log( response );  // this code does not run until we have a response (i.e. the request is done)
      $('#output').append(`<p><strong>${ response.number }</strong><br>${ response.text }</p>`);
    })
    .fail(function( xhr ){
      console.warn( xhr.status, xhr.responseText ); // this code only runs if there was a 404 error when retrieving the URL
      $('#output').append(`<p>${ xhr.responseText }</p>`);
    });

    // .always(function( data ){
    //     console.log('always():', data);
    // });

    console.log('End of click handler!!');

    // const xhr = new XMLHttpRequest();
    //
    // // The fast way: just run this function once
    // // when the response data is finished loading.
    // xhr.onload = function(){
    //   console.log('Finished loading response from server!');
    //   console.log( 'RESPONSE:', xhr.response );
    //
    //   const trivia = JSON.parse( xhr.response );
    //   console.log( trivia );
    //
    //   // const $pTag = $('<p>').html( xhr.response );
    //
    //   $('#output').append(`<p><strong>${ trivia.number }</strong><br>${ trivia.text }</p>`);
    //
    // };
    //
    // xhr.open('GET', 'http://numbersapi.com/random/trivia?json');
    // xhr.send();
    //
    // console.log('Finished request!');

  });  // $('#trivia-button').on()


  // Handle click on search button by sending request
  // to API for specific number typed into input field
  $('#num-search').on('click', function(){

    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
      console.log('Finished loading response from server!');
      console.log( 'RESPONSE:', xhr.response );

      const trivia = JSON.parse( xhr.response );
      console.log( trivia );

      $('#results').append(`<p><strong>${ trivia.number }</strong><br>${ trivia.text }</p>`);
    };

    const number = $('#num').val();

    xhr.open('GET', `http://numbersapi.com/${ number }?json`);
    xhr.send();

    console.log('Finished request!');

  });  // $('#num-search').on()


}); // $(document).ready()
