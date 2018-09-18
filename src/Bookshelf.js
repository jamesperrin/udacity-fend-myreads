import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    render() {
        const { title, booksList, onBookUpdate } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksList.map(book => (<li key={book.id}><Book book={book} onBookUpdate={onBookUpdate} /></li>))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf