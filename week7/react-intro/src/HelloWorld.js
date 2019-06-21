// Import the core functionality of Reat into this file,
// so things like JSX work properly
import React from 'react';

// "Pure Functional" component: just a function that returns some
// JSX code to be rendered on the page
const HelloWorld = function(){
  return (
    <h3>Hello from the HelloWorld component</h3>
  );
};

export default HelloWorld;
