import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class Search extends React.Component {
  state = {
    booksSelection: "",
    books: [],
    mySearchText: "",
    none: "None",
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
  };

  componentDidMount() {}

  async handleChange({ target }) {
    //Clone
    let state = { ...this.state };
    //Edit
    state[target.name] = target.value;
    state.books = await BooksAPI.search(target.value);
    if (Array.isArray(state.books) && state.books.length > 0) {
      state.books.map((b) => {
        this.props.state.currentlyReading.map((bo) => {
          if (bo.title === b.title) {
            b.shelf = "currentlyReading";
          }
          return bo;
        });
        this.props.state.read.map((bo) => {
          if (bo.title === b.title) {
            b.shelf = "read";
          }
          return bo;
        });

        this.props.state.wantToRead.map((bo) => {
          if (bo.title === b.title) {
            b.shelf = "wantToRead";
          }
          return bo;
        });

        return state.books;
      });
    }
    if (target.value === "") {
      state.books = [];
    }

    if (!Array.isArray(state.books) || state.books.length === 0)
      state.books = [];

    //Set Satate
    this.setState(state);
  }

  async handleSelectionChange({ target }, book) {
    //Clone
    let state = { ...this.state };
    //Edit
    //state[target.name] = target.value;
    state.books[target.name] = target.value;
    console.log(state.books[target.name]);
    if (target.value === "currentlyReading") {
      this.props.Addreading(book, "currentlyReading");
      state.currentlyReading = "✓ Currently Reading";
      await BooksAPI.update(book, "currentlyReading");
    } else if (target.value === "read") {
      this.props.Addreading(book, "read");

      state.read = "✓ read";
      await BooksAPI.update(book, "read");
    } else if (target.value === "wantToRead") {
      this.props.Addreading(book, "wantToRead");
      state.wantToRead = "✓ wantToRead";
      await BooksAPI.update(book, "wantToRead");
    } else if (target.value === "none") {
      state.none = "✓ None";
      this.props.Addreading(book, "none");

      await BooksAPI.update(book, "none");
    }

    //Set Satate
    this.setState(state);
  }

  goback = () => {
    this.props.actions.push(`/`);
  };
  render() {
    return (
      <div className="">
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                name="mySearchText"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.map((book, i) => {
                return (
                  <li key={i}>
                    <div className="book">
                      <div className="book-top">
                        {book.imageLinks !== undefined &&
                          book.imageLinks.thumbnail !== undefined && (
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
                            onChange={(e) =>
                              this.handleSelectionChange(e, book)
                            }
                            defaultValue="none"
                            value={book.shelf}
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="move" hidden>
                              ....
                            </option>
                            <option value="currentlyReading">
                              {this.state.currentlyReading}
                            </option>

                            <option value="wantToRead">
                              {this.state.wantToRead}
                            </option>
                            <option value="read">{this.state.read}</option>
                            <option value="none">{this.state.none}</option>
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
    );
  }
}

export default Search;
