import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
    state = {
        readingList: []
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
    getBooksList = () => {
        BooksAPI.getAll().then((readingList) => {
            this.setState({ readingList })
        });
    }

    /**
     * @description Populates BookApp Component
     */
    componentDidMount() {
        this.getBooksList();
    }

    /**
     * @description Updates book's shelf location
     * @param {Object} Book - JSON Object
     * @param {string} shelf - new shelf location
     */
    onBookMove = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.getBooksList();
        });
    }

    /**
     * @description Filters list of books based on shelf
     * @param {string} bookShelf - new book shelf
     * @returns {Array} Filtered array of book objects
     */
    readingBooksList = (bookShelf) => this.state.readingList.filter(book => book.shelf === bookShelf)

  render() {
    return (
        <div className="app">
            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="e-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {
                                BooksApp.bookShelves.map(bookShelf => (
                                    <Bookshelf
                                        key={bookShelf.category}
                                        title={bookShelf.title}
                                        readingBooksList={this.readingBooksList(bookShelf.category)}
                                        onBookMove={this.onBookMove}
                                />))
                            }
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search' className='close-search' title='Add a book'>Add a book</Link>
                    </div>
                </div>
            )} />

            <Route path='/search' render={() => (
                <SearchBooks readingList={this.state.readingList} onBookMove={this.onBookMove} />
            )} />
        </div>
    )
  }
}

export default BooksApp
