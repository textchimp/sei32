
$(document).ready(function(){

  console.log('loaded main.js');

  $('#trivia-button').on('click', function(){

    const xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function(){
    //   console.log( 'Ready state changed:', xhr.readyState );
    //
    //   if( xhr.readyState === 4 ){  // 4 means DONE!
    //     console.log( 'Response:', xhr.response );
    //   }
    // };

    xhr.onload = function(){
      console.log('Finished loading response from server!');
      console.log( 'RESPONSE:', xhr.response );

      $('#output').html( xhr.response );

    };

    xhr.open('GET', 'http://numbersapi.com/random/trivia');
    xhr.send();

    console.log('Finished request!');

  });  // $('#trivia-button').on()

}); // $(document).ready()
