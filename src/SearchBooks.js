import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component{
    state = {
        query: '',
        bookSeachList: []
    }

    /**
     * @description Updates Book Component state.query
     * @param {string} query - book title or author
     */
    updateQuery = (query) => {
        this.setState({ query: query })

        if (query.length >= 2) {
            this.bookLookUp(this.state.query);
        }
    }

    /**
     * @description
     * Performs a seach based on a search query.
     * @param {string} query - book title or author
     * @return {array} array - An array of book JSON objects
     */
    bookLookUp = (query) => {
        BooksAPI.search(query).then((bookSeachList) => {
            if (bookSeachList.error) {
                this.setState({ bookSeach: [] });
            } else {
                this.setState({ bookSeachList });
            }
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search' title='Close' >Close</Link>
                    <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author.
                    So, don't worry if you don't find a specific author or title.
                    Every search is limited by search terms.
                    */}
                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.bookSeachList.length === 0 &&
                            (<li key="none">No results</li>)
                        }

                        {
                            this.state.bookSeachList.length > 0 &&
                            (this.state.bookSeachList.map(bookSeach => {
                                this.props.readingList.map(readingBook => {
                                    if (bookSeach.id === readingBook.id) {
                                        bookSeach.shelf = readingBook.shelf;
                                    }
                                });

                                return (
                                    <li key={bookSeach.id}>
                                        <Book book={bookSeach}
                                            onBookMove={this.props.onBookMove}
                                        />
                                    </li>
                                )
                            }))

                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook