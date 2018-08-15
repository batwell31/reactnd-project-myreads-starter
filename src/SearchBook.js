import React, { Component } from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import BookList from "./BookList"
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchedBooks: []
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        });
        this.searchBooks(query);
    }

    searchBooks = (query, maxResults) => {
        BooksAPI.search(query, maxResults || 10)
            .then(searchedBooks => {
                if (!searchedBooks || searchedBooks.error)
                    return [];

                let response = [];

                for (const searchedBook of searchedBooks) {
                    for (const book of this.props.books) {
                        if (searchedBook.id === book.id) {
                            console.log('searched book %j', searchedBook);
                            searchedBook.shelf = book.shelf;
                        }
                    }
                    response.push(searchedBook);
                }

                return response;
            })
            .then(searchedBooks => {
                this.setState(oldState => ({ searchedBooks }))
            })
            .catch(err => console.error('Error occurred searching books: ', err));
    }

    render() {
        const { onChangeShelf } = this.props;
        const { query, searchedBooks } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookList books={searchedBooks} onChangeShelf={onChangeShelf} />
                </div>
            </div>
        )
    }
}

export default SearchBook

