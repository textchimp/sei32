// Coding Dictionary

const dict = {

  // the object that stores our actual words and definitions:
  definitions: {
    'method': 'a function which is defined inside an object',
    'scope': 'the visibility or lifetime of a variable within a program',
    'variadic': 'a variadic function accepts a variable number of arguments',
  },

  lookupWord: function( word ){

    if( word in this.definitions ){
      console.log(word + ':',  this.definitions[ word ] );
    } else {
      console.log(`Sorry, ${word} is not defined in the dictionary.`);
    }

  }, // lookupWord()


  printAllDefinitions: function(){

    let totalEntries = 0;

    for( const key in this.definitions ){
      console.log(key + ':',  this.definitions[ key ]);
      totalEntries++;
    }

    console.log('Total entries:', totalEntries);

  }, //printAllDefinitions(),


  addDefinition: function( word, definition ){

    if( word in this.definitions ){
      console.log('This word is already defined.');
      this.lookupWord(word); // show the user the existing definition
    } else {
      this.definitions[word] = definition;
      console.log(`Added ${word}: ${definition}`);
    }

  }, //addDefinition(),


  removeDefinition: function( word ){

    if( word in this.definitions ){
      delete this.definitions[word];
      console.log(`Deleted entry for ${ word }.`);
      console.log(`Total entries after delete: ${ Object.keys(this.definitions).length }`);
    } else {
      console.log(`No entry for ${ word }.`);
    }

  }, // removeDefinition(),


  getWords: function(){
    return 'Words: ' + Object.keys(this.definitions).join(', ');
  },


  searchDefinitions: function( searchString ){
    let foundMatches = false; // keep track of whether we find ANY matches during the loop

    for( const key in this.definitions ){
      const definition = this.definitions[key];
      if( definition.includes(searchString) ){
        this.lookupWord(key);
        foundMatches = true;  // this lets us remember that we have found at least one match (maybe more!)
      }
    } // for

    if( !foundMatches ){  // is foundMatches still false? i.e. never set to true in the loop, no matches found
      console.log(`Sorry, no matching definitions for "${ searchString }".`);
    }

  },


};
