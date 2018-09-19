import React, { Component } from 'react'

class Book extends Component {
    state = {
        bookShelf: ''
    }

    componentDidMount() {
        if (this.props.book.hasOwnProperty("shelf")) {
            this.setState({bookShelf:this.props.book.shelf});
        }
        else {
            this.setState({bookShelf: 'none'});
         }
    }

    /**
     * @description
     * Handles onChange event for Select list.
     * Updates Book's state.
     * @param {event} event - Object event
     */
    handleChange = (e) => {
        this.setState({
            bookShelf: e.target.value
        });

        this.props.onBookMove(this.props.book, e.target.value);
    };

    render() {
        const { book } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={
                        { width: 128, height: 193,
                            backgroundImage: `url(${book.hasOwnProperty("imageLinks") ? book.imageLinks.thumbnail: '' })` 
                        }}>
                        </div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange} value={this.state.bookShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {(
                        book.hasOwnProperty("authors")
                        && book.authors.map(author => (
                            <span key={author}>{author} <br /></span>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

export default Book