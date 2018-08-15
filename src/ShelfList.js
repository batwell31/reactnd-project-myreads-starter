import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

const shelves = ['currentlyReading', 'wantToRead', 'read'];

class ShelfList extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }
    render() {
        const { books, onChangeShelf } = this.props;

        return (
            <div>
                {
                    shelves.map(shelf => (
                        <div className="bookshelf" key={shelf}>
                            <h2 className="bookshelf-title">
                                {shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { 
                                    return str.toUpperCase(); 
                                })}
                            </h2>
                            <BookList books={books.filter(book => book.shelf === shelf)} onChangeShelf={onChangeShelf}
                            />
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default ShelfList;