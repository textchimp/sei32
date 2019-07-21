// Helper functions for our 3D sketch
var app = app || {};


app.animate = () => {

  // Animate the sphere position
  app.controls.step += app.controls.bouncingSpeed;
  app.sphere.position.y = 6  + Math.abs( Math.sin(app.controls.step) * 10 );
  app.sphere.position.x = 20 + Math.cos(app.controls.step) * 10;

  app.cube.rotation.x += app.controls.rotationSpeed;
  app.cube.rotation.y += app.controls.rotationSpeed;
  app.cube.rotation.z += app.controls.rotationSpeed;


  app.renderer.render( app.scene, app.camera );

  // Get this browser animation API to work out
  // when to run the animate() method again
  // (Ideally, 60 times/sec and only when the
  // window/tab is visible)
  requestAnimationFrame( app.animate );

};



app.createPlane = () => {

  const planeGeometry = new THREE.PlaneGeometry( 120, 20 );
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xCFD8DC
  });

  // Combine the geometry (shape) and the material
  // (what the surface looks like) into a mesh,
  // the actual 3D object
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );

  plane.position.set(15, 0, 0 );   // x, y, z
  plane.rotation.x = -0.5 * Math.PI; // Because of math(s)
  plane.receiveShadow = true; // shadows are cast onto this

  return plane;
};


app.createSpotlight = () => {

  const spotlight = new THREE.SpotLight( 0xFFFFFF );
  spotlight.position.set( -10, 60, 10 );
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;

  return spotlight;
};


app.createCube = () => {

  const cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF8F00,
    // wireframe: true
  });

  const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  cube.position.set( -4, 15, 0 );
  cube.castShadow = true;

  return cube;
};


app.createSphere = () => {

  const sphereGeometry = new THREE.SphereGeometry(
    6,   // radius
    40,  // number of triangle segments on X axis
    40   // number of triangle segments on Y axis
  );
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x039BE5,
    // wireframe: true
  });

  const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial);
  sphere.position.set( 20, 6, 2 );
  sphere.castShadow = true;

  return sphere;
};
