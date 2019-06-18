const baseURL = 'https://api.themoviedb.org/3';
const apiKey = '24d863d54c86392e6e1df55b9a328755';

$(document).ready(function(){
  console.log('loaded main.js');

  $('#query').focus(); // focus cursor in search input

  $('#search-form').on('submit', function(){
    console.log('form submitted!');

    const query = $('#query').val();
    console.log('query:', query);

    const url = `${ baseURL }/search/movie?query=${ query }&api_key=${ apiKey }`;

    $.getJSON( url )
    .done(function( res ){
      console.log( res );

      $('#results').empty();  //clear div so subsequent search results appear at top

      for( let i = 0; i < res.results.length; i++ ){
        const movie = res.results[i];
        const output = `
          <div class="result" id="${ movie.id }" style="border: 1px solid gray; padding: 10px; cursor: pointer; margin-bottom: 20px">
            <h3>${ movie.title } (${ movie.release_date.split('-')[0] })</h3>
            <p>${ movie.overview }</p>
            <img src="http://image.tmdb.org/t/p/w185${ movie.poster_path }">
          </div>
        `;
        $('#results').append(output);
      }

    });  // .done()

    return false; // Do NOT submit the form i.e. reload
  }); // form submit handler

  // event delegation to document: this will work for ANY div.result divs
  // that are added dynamically to the page, any time in the future
  $(document).on('click', '.result', function(){
    console.log( 'movie ID to show details for: ', this.id );

    //  make ajax request to movie show page (/movies/${ this.id}?api_key=...)
    // and in the .done() callback, hide the #results div,
    // and populate the #details div with details from the API response

  });

  // $('.result').on('click', function(){
  //
  // });


}); // $(document).ready()
