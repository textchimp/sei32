// (In JS) Change the body tag's style so it has a font-family of "Arial, sans-serif".
// (In JS) Replace each of the spans (nickname, favorites, hometown) with your own information.

document.body.style.fontFamily = 'Arial, sans-serif';

const nickname = document.getElementById('nickname');
nickname.innerHTML = 'Textchimp';

const favorites = document.getElementById('favorites');
favorites.innerHTML = 'Toller, Husky';

const hometown = document.getElementById('hometown');
hometown.innerHTML = 'Sydders';

// Iterate through each li and change the class to "listitem". Add a style tag that sets a rule for "listitem" to make the color red.

const listItems = document.querySelectorAll('li');

for( let i = 0; i < listItems.length; i++ ){
  const currentItem = listItems[i];
  currentItem.className = 'listitem';
}

// Create a new img element and set its src attribute to a picture of you. Append that element to the page.

const img = document.createElement('img');
img.src = 'http://placebear.com/300/300';

document.body.appendChild( img );



const books = [
  {
    title: 'The Design of EveryDay Things',
    author: 'Don Norman',
    alreadyRead: false,
    imageURL: 'http://fillmurray.com/200/200'
  },
  {
    title: 'The Most Human Human',
    author: 'Brian Christian',
    alreadyRead: true,
    imageURL: 'http://fillmurray.com/250/250'
  }
];

// Iterate through the array of books. For each book, create a p element with the book title and author and append it to the page.

for( let i = 0; i < books.length; i++ ){
  const currentBook = books[i];
  // console.log(currentBook.title, currentBook.author, currentBook.alreadyRead);

  const pTag = document.createElement('p');

  pTag.innerHTML = `Title: ${currentBook.title}, Author: ${currentBook.author}`;

  document.body.appendChild( pTag );

}

// Bonus: Use a ul and li to display the books.

const ulTag = document.createElement('ul');

for( let i = 0; i < books.length; i++ ){
  const currentBook = books[i];

  // Create <li> and set its contents
  const li = document.createElement('li');
  li.innerHTML = `Title: ${currentBook.title}, Author: ${currentBook.author}`;

  // Set <li> border colour based on read status
  if( currentBook.alreadyRead ){
    li.style.border = '1px solid grey';
  } else {
    li.style.border = '1px solid orange';
  }

  // Create <img> tag and set src attribute from current book object,
  // then append it to the <li> we created above
  const img = document.createElement('img');
  img.src = currentBook.imageURL;
  li.appendChild( img );

  // Add the <li> to the parent <ul>
  ulTag.appendChild( li );
}

// Add the <ul> including all its <li> children to the actual page
document.body.appendChild( ulTag );

// Bonus: add a property to each book with the URL of the book cover, and add an img element for each book on the page.
// Bonus: Change the style of the book depending on whether you have read it or not.
