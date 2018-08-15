import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ShelfList from './ShelfList';
import SearchBook from './SearchBook';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(err => console.error('Error occurred fetching contacts ', err));
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(this.setState(oldState => {
        let found = false;
        const newState = oldState.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf;
            found = true;
          }
          return b;
        });
        if (!found) {
          book.shelf = shelf;
          newState.push(book);
        }
        return { books: newState };
      }))
      .catch(err => console.error('Error occurred moving book: ', err));
  }

  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, maxResults || 15)
      .then(searchedBooks => {
        this.setState({ searchedBooks });
      })
      .catch(err => console.error('Error occurred searching books: ', err));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ShelfList books={this.state.books} onChangeShelf={this.changeShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBook books={this.state.books} onChangeShelf={this.moveBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp