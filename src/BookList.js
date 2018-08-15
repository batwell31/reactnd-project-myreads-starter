import React from "react";
import Book from "./Book";

class BookList extends React.Component {
    render() {
        let shelfName = ["Currently Reading", "Want to Read", "Read", "None"];
        let shelfTypes = ["currentlyReading", "wantToRead", "read", "none"];

        const shelf = shelfTypes.map(
            (x, i) => {
                let books = (this.props.books != undefined && this.props.books instanceof Array) && (this.props.books.filter((books) => books.shelf === x))
                return (
                    <div key={x} className="book-shelf-detail">
                        <p> Bookshelf Name : {shelfName[i]}</p>
                        <ol className="books-grid">
                            {books != undefined && books.length !== 0 &&
                                books.map((book, index) => {
                                    return (
                                        <li key={index}>
                                            <Book book={book} />
                                        </li>
                                    );
                                })}
                        </ol>
                    </div>
                )
            }
        );

        return (
            <div className="book-list">
                {shelf}
            </div>
        )
    }
}

export default BookList