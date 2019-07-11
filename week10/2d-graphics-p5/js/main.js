
// This runs once
function setup(){

  createCanvas(windowWidth, windowHeight);
  background( 0 );

  colorMode(HSB, 255); // Use Hue, Saturation, Brightness instead of RGB

  // fill( 255, 0, 0 ); // r, g, b
  // stroke(0, 0, 255);
  // // strokeWeight(4);
  //
  // // noFill(); // don't fill in the shape colour
  // noStroke();
  //
  // //      x, y pos   width, height
  // ellipse(windowWidth/2, windowHeight/2,  200, 200);
  //
  // fill(0, 255, 0, 127); // r, g, b, a
  // rect(500, 300, 200, 200);
  //
  // fill(0, 0, 255);
  // triangle(450, 300,  100, 500,  400, 500);
  //
  // stroke(255, 0, 0);
  // line(200, 200, 600, 600); // starting x, y to ending x, y
  //
  // point(100, 100);

} // setup()

// This runs 60 times a second (ideally)
function draw(){

  const xMouseVelocity = mouseX - pwinMouseX;  // mouse X speed! Current x pos minus last x pos

  // background( 0 );

  // if( frameCount % 10 !== 0 ){
  //   return;
  // }

  // ellipse(windowWidth/2, windowHeight/2, 100+frameCount*2, 100+frameCount*2);
  noStroke();
  // fill( random(255), random(255), random(255), 200 );
  // ellipse(random(windowWidth), random(windowHeight), 300, 300); // random position

  if( mouseIsPressed || keyIsDown(SHIFT) ){

    // const hue = frameCount % 255;
    // const hue = 255 * (mouseX / windowWidth); // normalising

    //               value    input range      output range
    const hue = map( mouseX,  0, windowWidth,  0, 255 );

    // const size = map( mouseY,  0, windowHeight,  10, 300);

    // console.log({ xMouseVelocity });
    const size = xMouseVelocity;

    fill( hue, 255, 255, 200 );
    ellipse(mouseX, mouseY, size, size);
  }


} // draw()


function keyPressed(){

  if( keyCode === 32 ){
    // Spacebar clears the screen
    background( 0 );
  }

}
