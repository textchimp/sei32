
$(document).ready(function(){

  // $('body').append('<p>It works!</p>');

  $.getJSON('/uptime')
  .done(function( res ){
    console.log( '/uptime response:', res );
    $('#uptime').html(`<p>${ res.data }</p>`)
  });

  // window.setInterval(function(){

  $.getJSON('/cpuhog')
  .done(function( res ){
    console.log('/cpuhog response:', res );
    $('#hog').html(`${ res.cpuHog } (as of ${ res.currentDate })`);
  });

  // }, 200);

  $.getJSON('/dogs')
  .done(function( res ){
    for( let i = 0; i < res.length; i++ ){
      const currentDog = res[i];
      $('#dogs').append(`<p>${ currentDog.name } (${ currentDog.roundness })</p>`)
    }
  });

});
