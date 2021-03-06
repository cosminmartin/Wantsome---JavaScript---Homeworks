const form = document.querySelector('form');
form.onsubmit = function(submitEvent) {
  // luati numele cartii din input
  submitEvent.preventDefault();
  const name = document.querySelector('input').value;
  const urlQuery = `https://www.googleapis.com/books/v1/volumes?q=${name}`;

  //apelati API-ul si folositi functia resultOfBooks ca si handler pentru raspunsul primit
  const request = new XMLHttpRequest();
  request.open('GET', urlQuery);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    resultsOfBooks(request.response);
  };
};

function resultsOfBooks(response) {
  //schimbati argumentele in functia de mai jos astfel incat sa primeasca response si o functie de tip care sa fie apelata ca si callback - displayBookParagraph
  displayDetailsWithCallback(response, displayBookParagraph);
}

function displayDetailsWithCallback(books, callback) {
  const booksArray = books.items.slice(0, 4);
  for (let i = 0; i < booksArray.length; i++) {
    callback(booksArray[i].volumeInfo.title);
    callback('Publisher: ' + booksArray[i].volumeInfo.publisher);
    callback('Date: ' + booksArray[i].volumeInfo.publishedDate);
    callback('Number of pages: ' + booksArray[i].volumeInfo.pages);
    callback('Language: ' + booksArray[i].volumeInfo.language);
    callback('Description: ' + booksArray[i].volumeInfo.description);
  }
  // up to 4 books
  // detaliile le gasiti in volumeInfo - cautati prin obiectul principal folosind console.log()
  // stocati detaliile in variabile folosind const sau let
}

function displayBookParagraph(book) {
  let paragraphBook = document.createElement('p');
  paragraphBook.textContent = book;
  document.querySelector('.custom-input').appendChild(paragraphBook);
  // formati un text de genul 'cele 4 carti citite sunt: titlu1 titlu2 titlu3 titlu4'
  // inserati intr-un paragraph textul format
}

