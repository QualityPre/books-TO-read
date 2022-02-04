'use strict';
const formEl = document.getElementById('form');
const btnSubmitEl = document.querySelector('.btn-submit');
const modalEl = document.getElementById('modal');
const containerBooksEl = document.querySelector('.container--books');
const addNewBookBtnEl = document.getElementById('newBookBtn');
const closeEl = document.querySelector('.close');
let deleteButtonsEl;

let myLibrary = [
  // {
  //   title: 'The fun book',
  //   author: 'Mr. Smith',
  //   genre: 'Romance',
  //   haveRead: true,
  // },
  // {
  //   title: 'The book of soccer',
  //   author: 'Pele',
  //   genre: 'Sports',
  //   haveRead: false,
  // },
  // {
  //   title: 'DIY for U',
  //   author: 'A hammer',
  //   genre: 'Self-help',
  //   haveRead: false,
  // },
  // {
  //   title: 'Weather modification',
  //   author: 'mr.Sky',
  //   genre: 'Science',
  //   haveRead: true,
  // },
];

function Book(title, author, genre, haveRead, id) {
  // the constructor...
  return {
    title,
    author,
    genre,
    haveRead,
    id,

    renderBook() {
      const html = ` 
      <div class="container--book">
        <div class="book">
          <h1 class="title">${this.title}</h1>
          
          <h3 class="author">written by ${this.author}</h3>
          <p class="genre">${this.genre}</p>
          <div class="check">
            <input type="checkbox" name="haveRead" value="haveRead"
            id="haveRead" ${this.haveRead ? 'checked' : 'unchecked'} />
            <label for="haveRead">Have Read?</label><br />
            </div>
            <button class="btn--delete" data-id=${this.id}
           >
            <img src="./trash-outline.svg" />
          </button>
          
        </div>
      </div>
    `;

      containerBooksEl.insertAdjacentHTML('afterbegin', html);
      deleteButtonsEl = document.querySelectorAll('.btn--delete');
      deleteButtonsEl.forEach(btn => {
        btn.addEventListener('click', () => this.deleteBook(btn));
      });
    },
    deleteBook(btn) {
      let bookId = +btn.dataset.id;
      myLibrary = myLibrary.filter(book => {
        return book.id !== bookId;
      });
      containerBooksEl.innerHTML = '';
      saveToLocalStorage(myLibrary);
      loadingLibrary(myLibrary);
    },
  };
}

function addBookToLibrary(e) {
  e.preventDefault();

  let newBook = new Book(
    form.title.value,
    form.author.value,
    form.genre.value,
    form.read.checked,
    randomNumber()
  );

  myLibrary.push(newBook);
  saveToLocalStorage(myLibrary);
  newBook.renderBook();
  formEl.reset();
  modalEl.style.display = 'none';
}
function saveToLocalStorage(array) {
  localStorage.setItem('LibraryQualityPre', JSON.stringify(array));
}

function loadFromLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('LibraryQualityPre'));
  if (!myLibrary) myLibrary = [];
  loadingLibrary(myLibrary);
}
function loadingLibrary(arr) {
  arr.forEach(book => {
    let newBook = new Book(
      book.title,
      book.author,
      book.genre,
      book.haveRead,
      book.id
    );
    newBook.renderBook();
  });
}
loadFromLocalStorage();

addNewBookBtnEl.addEventListener('click', e => {
  modalEl.style.display = 'block';
  closeModal(closeEl);
});

formEl.addEventListener('submit', e => {
  addBookToLibrary(e);
});

function closeModal(element) {
  element.addEventListener('click', e => {
    modalEl.style.display = 'none';
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      modalEl.style.display = 'none';
    }
  });
}

function randomNumber() {
  return Math.random();
}
