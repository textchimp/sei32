
// If the app variable already exists, then reuse it,
// otherwise initialise it to an empty object
var app = app || {};

app.controls = {
  step: 0,  // for controlling the sphere position
  bouncingSpeed: 0.05,  // how much to move by, each draw
  rotationSpeed: 0.01
};

// This is the entry point to our application
app.init = () => {

  console.log('Hello 3D w0rld!');

  // Control panel
  app.gui = new dat.GUI();
  app.gui.add( app.controls, 'bouncingSpeed', 0, 2 );
  app.gui.add( app.controls, 'rotationSpeed', 0, 1 );

  // The scene stores and keeps track of all the objects we are creating, including
  // the lights and the camera
  app.scene = new THREE.Scene();

  // The camera defines our view into the scene, as originating from a
  // particular perspective
  app.camera = new THREE.PerspectiveCamera(
    60, // field of view
    window.innerWidth / window.innerHeight,  // screen ratio
    0.1,  // near field (how close to the camera should we still see things)
    1000  // far field (how far away from the camera should we still see things)
  );

  // Where exactly is the camera in the scene?
  app.camera.position.x = -30;
  app.camera.position.y = 40;
  app.camera.position.z = 30;
  // app.camera.position.set(-30, 40, 30);

  app.camera.lookAt( app.scene.position )  // Look at the origin: (x=0, y=0, z=0)


  // The renderer calculates how to draw all the objects in the scene,
  // based on the lighting and the camera perspective, and renders
  // it all down to a 2D image to show in a <canvas> browser element
  app.renderer = new THREE.WebGLRenderer(); // use hardware acceleration!
  app.renderer.setSize( window.innerWidth, window.innerHeight );
  app.renderer.setClearColor( 0x000000 );  // background colour
  app.renderer.shadowMap.enabled = true;  // shadows are computationally expensive, and thus disabled by default
  app.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // ??

  // Put the canvas element that the renderer has created into the actual DOM
  document.getElementById('output').appendChild( app.renderer.domElement );

  // Add some reference lines for the x,y,z axes (just for debugging)
  app.axes = new THREE.AxesHelper( 40 );
  app.scene.add( app.axes );


  // Let's add a 'plane', a 2D sheet, a.k.a. "The Runway"
  app.plane = app.createPlane();
  app.scene.add( app.plane );

  app.cube = app.createCube();
  app.scene.add( app.cube );

  app.sphere = app.createSphere();
  app.scene.add( app.sphere );


  app.spotlight = app.createSpotlight();
  app.scene.add( app.spotlight );

  app.ambient = new THREE.AmbientLight( 0x333333 );
  app.scene.add( app.ambient );

  // Finally, actually render everything once:
  // app.renderer.render( app.scene, app.camera );

  // Control camera position with mouse
  app.mouseControls = new THREE.OrbitControls(
    app.camera,
    app.renderer.domElement
  );

  app.animate();  // start the animation loop

}; // init()

// Like jQuery $(document).ready()
window.onload = app.init;
