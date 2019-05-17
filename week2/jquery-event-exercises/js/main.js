let globalVar = 'hello';

$(document).ready(function(){


  globalVar = 'goodbye';

  console.log('images:', $('img').length);

  $('img').on('click', function(){
    console.log('clicked!');
    // $(this).hide();
  });

  $('#kitty').on('mousemove', function( ev ){
    console.log('move!', ev.offsetX);
  });

  $('#kitty').on('mouseenter', function(){
    console.log('mouse enter!');
  })

  $('input[type="text"]').on('keydown', function( ev ){
    console.log('key press!', ev.keyCode);
  });

  $('input[type="text"]').on('change', function(){
    console.log('form input change!');
  });

  $('input[type="text"]').on('focus', function(){
    console.log('element got focus');
  });


  // toggle the bear images
  $('#toggle').on('click', function(){
    // console.log('toggle click');
    $('.triple-kitty1').toggle();
  });

  $('#fade').on('click', function(){
    $('.triple-kitty2').slideToggle(1000);
  });

  $('h2').eq(3).on('click', function(){
    $('.triple-kitty3').show();
  });

}); // end of the $(document).ready(function(){
