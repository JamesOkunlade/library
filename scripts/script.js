/// Add New Book Modal scripts

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);



///LocalStorage setup

class Store {
  static getBooks() {
    let myLibrary;
    if(localStorage.getItem('myLibrary') === null) {
      myLibrary = [];
    } else {
      myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    return myLibrary;
  }

  static addBook(book) {
    const myLibrary =  Store.getBooks();
    myLibrary.push(book);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }

  // static removeBook() {
  //   const myLibrary = Store.getBooks();
  //
  //   myLibrary.forEach((book, index) => {
  //     if (myLibrary.indexOf(book) === index) {
  //       myLibrary.splice(index, 1);
  //     }
  //   });
  //   localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  // }

}


/// Library scripts

let myLibrary = Store.getBooks();



// The constructor for creating book

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}



// Takes book from form and adds it to myLibrary array.
function addBookToLibrary(title, author, pages) {
    if (title === '' || author === '' || pages === '') {
      alert('Please fill in all fields');
    }else {
      const book = new Book(title, author, pages);
      Store.addBook(book)
    }
  }


document.querySelector('#book-form').addEventListener('submit', function(e)
{
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  addBookToLibrary(title, author, pages);
});



  // Clearing the form
  // function clear() {
  //   document.querySelector('title').value = '';
  //   document.querySelector('author').value = '';
  //   document.querySelector('pages').value = '';
  // }


/// Loops through each book in the myLibrary array and renders it on the interface

  function render() {
    myLibrary = Store.getBooks();
    myLibrary.forEach(
      function(book) {
        const books = document.querySelector('#shelf');
        const row = document.createElement('div');
        row.innerHTML = `
        <div class="box">
          <div id="book" class="book">
            <div class="cast">
            </div>
            <hr>
            <div class="meta">
              <h6 id="">Title: ${book.title}</h6>
              <p id="">Author: ${book.author}</p>
              <p id="">Pages: ${book.pages}</p>
            </div>
            <span class=""><a href="#" class="delete">delete</a><span>
          </div>
        </div>
        `;

        books.appendChild(row);
      }
    )

  }


/// Deleting books
document.querySelector('#shelf').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
})



/// Calls
document.addEventListener('DOMContentLoaded', render());
console.log(myLibrary);
