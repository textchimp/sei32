
// Array of particles to draw
let particles = [];

// For our control panel
const controls = {
  velocityScale: 0.2,
  lineDistanceThreshold: 300,
  edgeMode: 'bounce',
  drawParticles: true
};

function setup(){
  createCanvas(windowWidth, windowHeight); // canvas fills whole window
  noStroke();
  background( 0 );
  colorMode(HSB, 255); // use Hue, Saturation, Brightness mode for colours, 0-255

  // add a control panel
  const gui  = new dat.GUI();
  gui.add( controls, 'velocityScale', -1, 1 );
  gui.add( controls, 'lineDistanceThreshold', 0, 1000 );
  gui.add( controls, 'edgeMode', ['bounce', 'wrap'] ); // an array here means show a dropdown
  gui.add( controls, 'drawParticles' );
}

function draw(){

  // Trails!
  if( !keyIsDown(CONTROL) ){
    background( 0 );
  }

  let vx = mouseX - pwinMouseX + random([-4, 4]);  // x velocity
  let vy = mouseY - pwinMouseY + random([-4, 4]);  // y velocity

  if( keyIsDown(SHIFT) ){
    const hue = frameCount % 255;
    // fill( hue, 255, 255, 200 );
    // ellipse(mouseX, mouseY, 50, 50);

    // To add  a new particle, push it on to the array,
    // so we can draw it afresh every draw()
    particles.push({
      x: mouseX,
      y: mouseY,
      vx: vx,
      vy: vy,
      hue: hue,
      size: vx + 20
    });

  } // if pressed

  updateParticles();

} // draw()


// update particle positions and draw them
function updateParticles(){

  for( let i = 0; i < particles.length; i++ ){
    const p = particles[i];

    // First update the particle position
    p.x += p.vx * controls.velocityScale;
    p.y += p.vy * controls.velocityScale;


    if( controls.edgeMode === 'wrap' ){

      if( p.x >= windowWidth ){
        p.x = 0;
      } else if( p.x <= 0 ){
        p.x = windowWidth;
      }
      if( p.y >= windowHeight ){
        p.y = 0;
      } else if( p.y <= 0 ){
        p.y = windowHeight;
      }

    } else {

      if( p.x >= windowWidth || p.x <= 0 ){
        p.vx *= -1; // reverse the velocity! (bounce)
      }
      if( p.y >= windowHeight || p.y <= 0 ){
        p.vy *= -1; // reverse the velocity! (bounce)
      }

    } // wrap vs bounce


    if( controls.drawParticles ){
      fill( p.hue, 255, 255, 200 );
      ellipse( p.x, p.y, p.size, p.size );
    }

    // draw a line between this particle and every other particle
    for( let j = 0; j < particles.length; j++ ){
      const other = particles[j];

      // Only draw a line between the particles if they are close enough to each other
      const xDist = p.x - other.x;
      const yDist = p.y - other.y;
      const distance = Math.sqrt( xDist*xDist + yDist*yDist ); // Pythagoras yo!

      // The transparency of the line is 'inversely proportional' to the distance
      // between the particles (the closer they are, the less transparent it is)
      const distanceAlpha = map( distance, 0, controls.lineDistanceThreshold, 255, 0);
      stroke( p.hue, 255, 255, distanceAlpha );

      // if( distance < controls.lineDistanceThreshold ){
      line(p.x, p.y, other.x, other.y);
      // }

    } // for

    noStroke(); // don't show outlines for circles

  } // for each particle

} // updateParticles()


function keyPressed(){
  if( keyCode === 32){
    particles = []; // clear the particles on spacebar press
  }
}
