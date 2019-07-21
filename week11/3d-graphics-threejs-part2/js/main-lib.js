// Helper functions for our 3D sketch
var app = app || {};


app.animate = () => {

  app.stats.update();

  app.animateParticleSystem();

  // Animate the sphere position
  app.controls.step += app.controls.bouncingSpeed;
  // app.sphere.position.y = 6  + Math.abs( Math.sin(app.controls.step) * 10 );
  // app.sphere.position.x = 20 + Math.cos(app.controls.step) * 10;
  app.sphere.rotation.y += app.controls.rotationSpeed;

  app.cube.rotation.x += app.controls.rotationSpeed;
  app.cube.rotation.y += app.controls.rotationSpeed;
  app.cube.rotation.z += app.controls.rotationSpeed;

  app.cubes.forEach( cube => {
    cube.rotation.x += cube.rotateStep;
    cube.rotation.y += cube.rotateStep;
    cube.rotation.z += cube.rotateStep;
  });

  app.renderer.render( app.scene, app.camera );

  // Get this browser animation API to work out
  // when to run the animate() method again
  // (Ideally, 60 times/sec and only when the
  // window/tab is visible)
  requestAnimationFrame( app.animate );

};


app.animateParticleSystem = () => {

  const particles = app.particleSystem.geometry.vertices;

  for( let i = 0; i < particles.length; i++ ){
    const p = particles[i];

    // Calculate distance of each particle from the earth
    // Because the earth is at (0,0,0), our calculation only
    // has to involve the particle's position
    const distSquared = (p.x * p.x) + (p.y * p.y) + (p.z * p.z);

    // Don't apply gravity when particles get too close to the earth
    // (or the particles will accelerate too much and shoot off never
    // to return)
    if( distSquared > 10.0 ){
      // Newton!
      const gravityForce = -0.2 * ( 1.0 / distSquared );
      // Apply the force of gravity to the particle's velocity
      p.vx += gravityForce * p.x;
      p.vy += gravityForce * p.y;
      p.vz += gravityForce * p.z;
    }

    // The new position for the particle is its
    // current position, incremented by its velocity
    // (and also scale it so we can globally speed them
    // up or slow them down)
    p.x += p.vx * app.controls.particleVelocityScale;
    p.y += p.vy * app.controls.particleVelocityScale;
    p.z += p.vz * app.controls.particleVelocityScale;

    // p.y += -app.controls.bouncingSpeed;
    // // warp particle back to the top of the range if
    // // it's disappearing out of view
    // if( p.y < -app.controls.particleDistributionRange ){
    //   p.y = app.controls.particleDistributionRange;
    // }

  } // for

  app.particleSystem.geometry.verticesNeedUpdate = true;

  // app.particleSystem.rotation.y += app.controls.rotationSpeed;

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
  // plane.receiveShadow = true; // shadows are cast onto this

  return plane;
};


app.createSpotlight = () => {

  const spotlight = new THREE.SpotLight( 0xFFFFFF );
  spotlight.position.set( -10, 60, 10 );
  // spotlight.castShadow = true;
  // spotlight.shadow.mapSize.width = 2048;
  // spotlight.shadow.mapSize.height = 2048;

  return spotlight;
};


app.createCube = (x=-4, y=30, z=0) => {

  const cubeGeometry = new THREE.BoxGeometry(
     4,
     4,
     4
   );
  const cubeMaterial = new THREE.MeshLambertMaterial({
    // color: 0xFF8F00,
    color: 0xFFFFFF,
    // map: THREE.ImageUtils.loadTexture('img/earth.jpg'),
    // wireframe: true
  });

  const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  cube.position.set( x, y, z );
  // cube.castShadow = true;

  cube.rotation.x = Math.random();
  cube.rotation.y = Math.random();
  cube.rotation.z = Math.random();
  cube.rotateStep = Math.random() * 0.05;

  cube.material.color.setRGB(
    Math.random(),
    Math.random(),
    Math.random()
  );

  return cube;
};


app.createSphere = () => {

  const sphereGeometry = new THREE.SphereGeometry(
    30,  // radius
    50,  // number of triangle segments on X axis
    50,  // number of triangle segments on Y axis
  );
  const sphereMaterial = new THREE.MeshPhongMaterial({
    // color: 0x039BE5,
    color: 0xFFFFFF,
    // wireframe: true,
    map: THREE.ImageUtils.loadTexture('img/earth.jpg'),
    side: THREE.DoubleSide
  });

  const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial);
  sphere.position.set( 0, 0, 0 );
  // sphere.castShadow = true;

  return sphere;
};


app.createParticleSystem = () => {

  const particles = new THREE.Geometry();
  const dist = app.controls.particleDistributionRange;

  for( let i = 0; i < app.controls.numParticles; i++ ){
    // Create a particle and give it a random position
    const particle = new THREE.Vector3(
      // THREE.Math.randInt(-dist, dist), // x
      100,
      THREE.Math.randInt(-dist, dist), // y
      THREE.Math.randInt(-dist, dist)  // z
    );

    // Give each particle a random velocity in x,y,z
    particle.vx = 0; // THREE.Math.randFloat(-1, 1);
    particle.vy = 0; // THREE.Math.randFloat(-1, 1);
    particle.vz = 0; // THREE.Math.randFloat(-1, 1);

    particles.vertices.push( particle );
  } // for

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture('img/snowflake.png'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    alphaTest: 0.5
  });

  console.log({particles, particleMaterial});

  const particleSystem = new THREE.Points(
    particles, // the points involved, i.e. the Geometry
    particleMaterial
  );

  return particleSystem;
};
