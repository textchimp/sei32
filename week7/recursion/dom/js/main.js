
const traverseDOM = node => {
  // Recursively visit each child node of the argument given,
  // printing out the node type (div, p, span, a?) and the class if any
  // NOTE: to do this you will need to loop over node.children
  console.log( node.nodeName, node.className );
  for( let i = 0; i < node.children.length; i++ ){
    traverseDOM( node.children[i] );
  }
};

// traverseDOM( document.body );


const traverseDOMIterative = node => {

  // Just using a loop!
  // But the loop will have to add each child node to an array,
  // and keep looping as long as there are unvisited nodes in that array!

  // use the 'spread' operator to make this HTMLCollection into
  // a normal array (i.e. one which has a .shift() method)
  let nodesToVisit = [...node.children];

  console.log('type:', typeof nodesToVisit);

  while( nodesToVisit.length > 0 ){
    const currentNode = nodesToVisit.shift();  // Remove first item from array and save into currentNode
    console.log( currentNode.nodeName, currentNode.className );

    // Add the children of currentNode to the end of the array we are currently looping over
    nodesToVisit = [  ...nodesToVisit, ...currentNode.children  ];

  }

};

traverseDOMIterative( document.body );
