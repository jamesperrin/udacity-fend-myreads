import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    render() {
        const { title, readingBooksList, onBookMove } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {readingBooksList.map(book => (<li key={book.id}><Book book={book} onBookMove={onBookMove} /></li>))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf