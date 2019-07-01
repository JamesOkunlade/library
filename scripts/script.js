/// Modal scripts

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



//LocalStorage setup

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
   myLibrary.unshift(book);
   localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
 }

 static toggleRead(ind) {
   const myLibrary = Store.getBooks();
   myLibrary.forEach((book, index) => {
     if (myLibrary.indexOf(book) == ind) {
       book.read = book.read === true ? false : true;
     }
   });
   localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

 }

 static removeBook(ind) {
   const myLibrary = Store.getBooks();

   myLibrary.forEach((book, index) => {
     if (myLibrary.indexOf(book) == ind) {
       myLibrary.splice(index, 1);
     }
   });
   localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
 }

}


/// Library scripts

let myLibrary = Store.getBooks();




// The constructor for creating book
function Book(title, author, pages, read) {
 this.title = title;
 this.author = author;
 this.pages = pages;
 this.read = read;
}

// Validates and takes book from form and adds it to myLibrary array.
function addBookToLibrary(title, author, pages, read) {
   if (title === '' || author === '' || pages === '') {
     alert('Please fill in all fields');
   }else {
     const book = new Book(title, author, pages, read);
     Store.addBook(book)
     clear();
   }
 }


document.querySelector('#book-form').addEventListener('submit', function(e)
{
 const title = document.querySelector('#title').value;
 const author = document.querySelector('#author').value;
 const pages = document.querySelector('#pages').value;
 const read = document.querySelector('#read').checked? true : false;
 addBookToLibrary(title, author, pages, read);
});

// Clearing the form input fields
 function clear() {
   document.querySelector('#title').value = '';
   document.querySelector('#author').value = '';
   document.querySelector('#pages').value = '';
 }


/// Loops through each book in the myLibrary array and renders it on the interface
 function render() {
   myLibrary = Store.getBooks();
   myLibrary.forEach(
     function(book) {
       const status = book.read? "checked" : "";
       const books = document.querySelector('#shelf');
       const row = document.createElement('div');
       row.innerHTML = `
       <div class="box">
         <div id="book" class="book">
           <div id="cast" class="cast">
             <span id="status">
               <label>
               <div class="hide">
                 <p>${myLibrary.indexOf(book)}</p>
               </div>
               <input class="switch" type="checkbox" ${status}>
               <span class="slider round">Read</span>
               </label>
             </span>
           </div>
           <hr>
           <div class="meta">
             <h6>Title: ${book.title}</h6>
             <p>Author: ${book.author}</p>
             <p>Pages: ${book.pages}</p>
           </div>
           <div class="hide">
             <p>${myLibrary.indexOf(book)}</p>
           </div>
           <span>
             <a href="#" class="delete">delete</a>
           </span>
         </div>
       </div>
       `;

       books.appendChild(row);
     }
   )
 }


 // Deleting books
 document.querySelector('#shelf').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.parentElement.remove();
    console.log(e.target.parentElement.previousElementSibling.textContent);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  }
 })


 /// Changing the read status of a book
 document.querySelector('#shelf').addEventListener('click', function(e){
   if (e.target.classList.contains('switch')) {
       Store.toggleRead(e.target.previousElementSibling.textContent);
   }
 });


 // Calls
document.addEventListener('DOMContentLoaded', render());
