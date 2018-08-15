import React from 'react'
import { Link } from "react-router-dom"
import BookList from "./BookList"

class SearchBook extends React.Component {
    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search-book" to="/">
                        Close
                </Link>
                    <div className="search-book-input">
                        <input
                            type="text"
                            placeholder="Search books by title or author"
                            onChange={(event) => this.props.onBookSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-book-result">
                    <ol className="books-grid">
                        <BookList
                            books={this.props.books}
                            onMoveBook={this.props.onChangeShelf}
                        />
                    </ol>
                </div>
            </div> 
        )   
    }
}

export default SearchBook

