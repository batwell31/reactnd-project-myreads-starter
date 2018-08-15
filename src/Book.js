import React from 'react'

class Book extends React.Component {
    render() {
        const img_thumbnail = this.props.book.imageLinks.thumbnail;
        const book_title = this.props.book.title;
        const book_authors = this.props.book.authors;

        return(            
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${img_thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select 
                            value={this.props.book.shelf} 
                            onChange={(event) => { this.props.onMoveBook(event, this.props.book) }}
                        >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book_title}</div>
                <div className="book-authors">{book_authors}</div>
            </div> 
        )
    }
}

export default Book