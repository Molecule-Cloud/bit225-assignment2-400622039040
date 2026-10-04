# BlueLib Catalogue

BIT225 Advanced Web Technologies - Assignment - 1

A single-page book catalogue for the BlueCrest College Library, built with
plain HTML, CSS and vanilla JavaScript. No frameworks or libraries are used.

## Features

- **Book display** - 7 books stored in a JavaScript array and rendered as
  cards dynamically. Nothing is hard-coded in the HTML.
- **Search** - filters cards by title as you type.
- **Category filter** - shows only books in the selected category. Works
  together with the search box.
- **Add book** - the form validates that all fields are filled and that
  copies is a whole number of 0 or more, then adds the book to the array
  and to the page without reloading.
- **Borrow** - reduces a book's copies by 1. At 0 copies the card reads
  "Out of stock" and the button is disabled.

## Responsiveness

| Screen width | Cards per row |
|---|---|
| Above 900px (desktop) | 3 |
| 600px – 900px (tablet) | 2 |
| Below 600px (mobile) | 1 |

## Project structure

    index.html      Page structure
    css/style.css   All styling, including the responsive breakpoints
    js/app.js       Data, rendering and all interactivity

## Running it

Open `index.html` in any modern browser.