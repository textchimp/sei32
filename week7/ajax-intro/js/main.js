
$(document).ready(function(){

  console.log('loaded main.js');

  // Load a new bit of trivia from the API
  // every time this button is pressed
  $('#trivia-button').on('click', function(){

    const xhr = new XMLHttpRequest();

    // The long way: respond to each state change,
    // waiting for the readyState to === 4, when the
    // response data will be available.
    // xhr.onreadystatechange = function(){
    //   console.log( 'Ready state changed:', xhr.readyState );
    //
    //   if( xhr.readyState === 4 ){  // 4 means DONE!
    //     console.log( 'Response:', xhr.response );
    //   }
    // };


    // The fast way: just run this function once
    // when the response data is finished loading.
    xhr.onload = function(){
      console.log('Finished loading response from server!');
      console.log( 'RESPONSE:', xhr.response );

      const trivia = JSON.parse( xhr.response );
      console.log( trivia );

      // const $pTag = $('<p>').html( xhr.response );

      $('#output').append(`<p><strong>${ trivia.number }</strong><br>${ trivia.text }</p>`);

    };

    xhr.open('GET', 'http://numbersapi.com/random/trivia?json');
    xhr.send();

    console.log('Finished request!');

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
