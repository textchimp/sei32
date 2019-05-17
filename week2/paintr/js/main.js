
let hue = 0;  // our hue increment counter

// keep track of the last mouse X position (so we can calculate speed)
let lastX = 0;

const createBlob = function( x, y ){
  // console.log('createBlob:', x, y);

  // Create a new DIV, set some CSS, and add it to the page
  const $blob = $('<div class="blob">');


  const xVelocity = Math.abs( x - lastX );

  // Remember the current x position for the next time this function is called,
  // to calculate the difference, i.e. the speed:
  lastX = x;

  let size =  xVelocity; //50;

  hue++;
  // The CSS hsl() function expects a hue value of 0-360, but if we give it a
  // larger value, it will just wrap it at 360 (i.e. hue % 360)
  const colour = `hsl(${ hue }, 100%, 50%)`;

  $blob.css({
    backgroundColor: colour,
    top:  (y - size/2) + 'px', // Make the circle appear centered on the mouse
    left: (x - size/2) + 'px',
    width: size + 'px',
    height: size + 'px',
  });

  $('body').append( $blob ); // add to page

  $blob.animate({top: window.innerHeight}, 1000, function(){
    $(this).remove();
  }) // animation!

};



$(document).ready(function(){

  console.log('DOM loaded!');

  // do something whenever the mouse moves anywhere in the document
  $(document).on('mousemove', function( ev ){
    if( ev.shiftKey ){
      // Only draw if the shift key was held for this mouse movement event
      createBlob(ev.clientX, ev.clientY);
    }
  });

  $(document).on('keypress', function( event ){
      if( event.key === ' ' ){
          $('div').remove(); // clear the screen whenever spacebar is pressed
      }
    });


}); // end of $(document).ready()
