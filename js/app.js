/**
 * BLUELIB CATALOGUE
 * Features:
 *  1. Render books from an array as cards
 *  2. Live search by title + categpry filter
 *  3. Add a new book via the form
 *  4. Borrow a book  - decrement copies, and disable at 0.
 */

// Data
const books = [
  {
    id: 1,
    title: "How to write clean code",
    author: "Benjamin Appiah",
    category: "IT",
    copies: 5,
  },
  {
    id: 2,
    title: "The Art of Programming",
    author: "Stephen Appiah",
    category: "IT",
    copies: 3,
  },
  {
    id: 3,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    copies: 0,
  },
  {
    id: 4,
    title: "Principles of Marketing",
    author: "Phil Kotler",
    category: "Business",
    copies: 8,
  },
  {
    id: 5,
    title: "A brief history of time",
    author: "Stephen Hawking",
    category: "Science",
    copies: 119,
  },
  {
    id: 6,
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    copies: 50,
  },
  {
    id: 7,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    category: "Arts",
    copies: 0,
  },
];

// Give each new item a unique ID
let nextId = 8;

// DOM REFERENCES
const bookGrid = document.getElementById("book-list");
const resultsCount = document.getElementById("results-count");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("filter-category");
const addBookForm = document.getElementById("add-book-form");
const formMessage = document.getElementById("form-message");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const categoryInput = document.getElementById("book-category");
const copiesInput = document.getElementById("book-copies");

//RENDERING
function createCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";
  card.dataset.id = book.id;

  const title = document.createElement("h3");
  title.className = "book-card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-card__author";
  author.textContent = "by " + book.author;

  const category = document.createElement("p");
  category.className = "book-card__category";
  category.textContent = book.category;

  const copies = document.createElement("p");
  copies.className = "book-card__copies";
  if (book.copies == 0) {
    copies.textContent = "Out of Stock";
    copies.style.color = "red";
  } else {
    copies.textContent =
      book.copies +
      (book.copies == 1 ? " copy available" : " copies available");
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn--borrow";
  button.dataset.id = book.id;
  button.textContent = "Borrow";

  //Part C: Disable button when no copies are available
  if (book.copies == 0) {
    button.disabled = true;
    button.textContent = "Unavailable";
  }
  card.append(title, author, category, copies, button);
  return card;
}

// Return the subset of books that matches both the current search query and category filter
function getFilteredBooks() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return books.filter(function (book) {
    const matchesTitle = book.title.toLowerCase().includes(term);
    const matchesCategory = category == "all" || book.category == category;
    return matchesTitle && matchesCategory;
  });
}

// Clear the grif and redraw it with whatever currently matches the search and the category dropdown
function renderBooks() {
  const visible = getFilteredBooks();

  bookGrid.innerHTML = ""; // Make the cards grid empty

  if (visible.length == 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "No books found";
    bookGrid.appendChild(empty);
  } else {
    visible.forEach(function (book) {
      bookGrid.appendChild(createCard(book));
    });
  }

  resultsCount.textContent = "Showing " + visible.length + " of " + books.length + " books";
}

// BORROWING
function borrowBook(id) {
  const book = books.find(function (book) {
    return book.id == id;
  });

  if (!book || book.copies == 0) {
    return;
  }

  book.copies--;
  renderBooks();
}


// Event delegation
bookGrid.addEventListener("click", function (event) {
  const button = event.target.closest(".btn--borrow");
  if (!button) {
    return
  }
  borrowBook(button.dataset.id)
});


// SEARCH AND FILTER
// Display the search results likve as yout type
searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);


// ADD BOOK
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message form-message--" + type;
  
}

// Validate the form and append a new book to the list if it passed the validation
function handleAddBook(event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const category = categoryInput.value;
  const copiesRaw = copiesInput.value.trim();

  if (!title || !author || !category || !copiesRaw) {
    showMessage("Missing fields", "error");
    return;
  }

  // Copies must be a whole number of copies
  const copies = Number(copiesRaw);
  if (!Number.isInteger(copies) || copies < 0) {
    showMessage("Invalid number of copies", "error");
    return;
  }

  // If all fields are filled out, add the book to the list
  books.push({
    id: nextId,
    title: title,
    author: author,
    category: category,
    copies: copies,
  });
  nextId++;

  addBookForm.reset();
  showMessage('"' + title + '" was added to the catalogue.', "success");
  renderBooks();
  
}

addBookForm.addEventListener("submit", handleAddBook);

// intialRender
renderBooks()
