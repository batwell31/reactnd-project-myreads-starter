import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    searchQuery: ''
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books })
      });
  };

  onMoveBook = (event, book) => {
    const target = event.target.value;
    
    BooksAPI.update(book, target).then(
      result => {
        BooksAPI.getAll().then(
          books => {
            this.setState({ books: books })

            if (this.state.searchQuery.length !== 0) {
              this.onMoveBook(this.state.searchQuery)
            }
          }
        )
      }
    )
  }

  onBookSearch = (query) => {
    this.setState({ searchQuery: query })
    let allBooks = this.state.books;

    if (query.length === 0) {
      this.setState({ searchQuery: query })
      return;
    }

    BooksAPI.search(query, 5).then(
      books => {
        // This combines the searched books with the books you already have
        if (books && books instanceof Array && (books.length !== 0)) {
          let searched_books = books.map((book) => {
            let update_book = allBooks.filter((b) => {
              return book.id === b.id
            });

            if (update_book[0] === undefined) {
              book.shelf = 'none';
            }

            return update_book[0] ? update_book[0] : book
          });
          this.setState({ searchedBooks: searched_books })
        } else {
          this.setState({  searchedBooks: [] })
        }
      }
    )
  }

  render () {
    return (
      <div className="app">
        <p>Book Apps</p>
        <Route path='/search' render={() => (
          <SearchBook 
            onMoveBook={this.onMoveBook} 
            books={this.state.searchedBooks} 
            onBookSearch={this.onBookSearch} 
          />
        )} />

        <Route exact path='/' render={({ history }) => (
          <BookList 
            books={this.state.books} 
            onMoveBook={this.onMoveBook}
          />
        )
        }
        />
        <div className="open-search">
          <Link className="" to="/search">
            Search a book
          </Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
