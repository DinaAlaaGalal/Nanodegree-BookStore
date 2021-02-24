import React from "react";
// import * as BooksAPI from './BooksAPI'
import { Link } from "react-router-dom";

import "./App.css";

class MYMAINPAGE extends React.Component {
  state = {
    booksSelection: "",
    books: [],
  };

  handleSelectionChange({ target }, book) {
    //Clone
    let state = { ...this.state };
    //Edit
    state[target.name] = target.value;

    if (target.value === "currentlyReading") {
      this.props.Addreading(book, "currentlyReading");
    }
    if (target.value === "read") {
      this.props.Addreading(book, "read");
    }
    if (target.value === "wantToRead") {
      this.props.Addreading(book, "wantToRead");
    }
    if (target.value === "none") {
      this.props.Addreading(book, "none");
    }

    //Set Satate
    this.setState(state);
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.state.currentlyReading.map((book, i) => {
                      return (
                        <li key={i}>
                          <div className="book">
                            <div className="book-top">
                              {book.imageLinks.thumbnail !== undefined && (
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      book.imageLinks.thumbnail
                                    })`,
                                  }}
                                />
                              )}
                              <div className="book-shelf-changer">
                                <select
                                  name="booksSelection"
                                  value="currentlyReading"
                                  onChange={(e) =>
                                    this.handleSelectionChange(e, book)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="move" hidden>
                                    ....
                                  </option>

                                  <option value="currentlyReading">
                                    ✓ Currently Reading
                                  </option>

                                  <option value="wantToRead">
                                    Want To Read
                                  </option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.state.wantToRead.map((book, i) => {
                      return (
                        <li key={i}>
                          <div className="book">
                            <div className="book-top">
                              {book.imageLinks.thumbnail !== undefined && (
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      book.imageLinks.thumbnail
                                    })`,
                                  }}
                                />
                              )}
                              <div className="book-shelf-changer">
                                <select
                                  name="booksSelection"
                                  value="wantToRead"
                                  onChange={(e) =>
                                    this.handleSelectionChange(e, book)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="move" hidden>
                                    ....
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>

                                  <option value="wantToRead">
                                    ✓ Want To Read
                                  </option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.state.read.map((book, i) => {
                      return (
                        <li key={i}>
                          <div className="book">
                            <div className="book-top">
                              {book.imageLinks.thumbnail !== undefined && (
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      book.imageLinks.thumbnail
                                    })`,
                                  }}
                                />
                              )}
                              <div className="book-shelf-changer">
                                <select
                                  value="read"
                                  name="booksSelection"
                                  onChange={(e) =>
                                    this.handleSelectionChange(e, book)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="move" hidden>
                                    ....
                                  </option>

                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>

                                  <option value="wantToRead">
                                    Want To Read
                                  </option>
                                  <option value="read">✓ Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default MYMAINPAGE;
