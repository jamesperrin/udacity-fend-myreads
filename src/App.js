import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      showSearchPage: false,
      books: []
  }
    /**
     * @description JSON object book shelves
     */
    static bookShelves = [
        { title: "Currently Reading", category: "currentlyReading" },
        { title: "Want to Read", category: "wantToRead" },
        { title: "Read",category: "read" }
    ];

    /**
     * @description Retrieves list of books from BooksAPI.
     */
    loadBooksFromAPI = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        });
    }

    /**
     * @description Populates BookApp Component
     */
    componentDidMount() {
        this.loadBooksFromAPI();
    }

    /**
     * @description Updates book's shelf location
     * @param {Object} Book - JSON Object
     * @param {string} shelf - new shelf location
     */
    onBookUpdate = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.loadBooksFromAPI();
        });
    }

    /**
     * @description Filters list of books based on shelf
     * @param {string} shelf
     * @returns {Array} Filtered array of book objects
     */
    booksList = (shelf) => this.state.books.filter(book => book.shelf === shelf)

  render() {
    return (
        <div className="app">
            {this.state.showSearchPage ? (
                <div className="search-books">
                    <div className="search-books-bar">
                        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                        <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                            <input type="text" placeholder="Search by title or author" />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div>
            ) : (
                    <div className="list-books">
                        <div className="e-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {BooksApp.bookShelves.map(shelf => (
                                    <Bookshelf key={shelf.category} title={shelf.title}
                                        booksList={this.booksList(shelf.category)}
                                        onBookUpdate={this.onBookUpdate} />
                                ))}
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                        </div>
                    </div>
                )}
        </div>
    )
  }
}

export default BooksApp
