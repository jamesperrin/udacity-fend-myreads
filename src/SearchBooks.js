import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component{
    state = {
        query: '',
        bookSearchList: []
    }

    /**
     * @description Updates Book Component state.query
     * @param {string} query - book title or author
     */
    updateQuery = (query) => {
        this.setState({ query: query })

        this.bookLookUp(query);
    }

    /**
     * @description
     * Performs a seach based on a search query.
     * @param {string} query - book title or author
     * @return {array} array - An array of book JSON objects
     */
    bookLookUp = (query) => {
        if (query) {
            BooksAPI.search(query).then(
                response => {
                    if (response.length > 0) {
                        response.map(bookSearch => {
                            this.props.readingList.map(readingBook => {
                                if (bookSearch.id === readingBook.id) {
                                    bookSearch.shelf = readingBook.shelf;
                                }
                            });
                        })

                        this.setState({ bookSearchList: response });
                    }
            });
        }

        this.setState({ bookSearchList: [] });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search' title='Close' >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => { this.updateQuery(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.bookSearchList.length === 0
                                ? <li key="none" style={{fontSize: '1.5em'}}>No results to display</li>
                                : this.state.bookSearchList
                                    .map(bookSearch => (
                                        <li key={bookSearch.id}>
                                            <Book book={bookSearch} onBookMove={this.props.onBookMove} />
                                        </li>)
                                    )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook