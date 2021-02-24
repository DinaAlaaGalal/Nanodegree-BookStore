import React from "react";
import Search from "./Search";
import MYMAINPAGE from "./MYMAINPAGE";
import * as BooksAPI from "./BooksAPI";

import { Route, Switch } from "react-router-dom";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    wantToRead: [],
    books:[]
  };
  async componentDidMount() {
    let state = { ...this.state };
    state.books = await BooksAPI.getAll();
    state.books.forEach((b) => {
      if (b.shelf === "currentlyReading") {
        return state.currentlyReading.push(b);
      } else if (b.shelf === "wantToRead") {
        return state.wantToRead.push(b);
      } else {
        return state.read.push(b);
      }
    });

    this.setState(state);
  }

  Addreading = async (book, shelf) => {
    const state = { ...this.state };
    book.shelf = shelf;
    if (shelf === "read") {

      state.read=[...state.read,book]

      state.wantToRead = state.wantToRead.filter((b) => b.title !== book.title);
      state.currentlyReading = state.currentlyReading.filter(
        (b) => b.title !== book.title
      );
    } else if (shelf === "currentlyReading") {
      book.shelf = "currentlyReading";
       state.currentlyReading=[...state.currentlyReading,book]
      state.read = state.read.filter((b) => b.title !== book.title);
      state.wantToRead = state.wantToRead.filter((b) => b.title !== book.title);
    } else if (shelf === "wantToRead") {
      book.shelf = "wantToRead";
      state.wantToRead=[...state.wantToRead,book]

      state.currentlyReading = state.currentlyReading.filter(
        (b) => b.title !== book.title
      );
      state.read = state.read.filter((b) => b.title !== book.title);
    } else {
      state.currentlyReading = state.currentlyReading.filter(
        (b) => b.title !== book.title
      );
      state.read = state.read.filter((b) => b.title !== book.title);
      state.wantToRead = state.wantToRead.filter((b) => b.title !== book.title);
    }

    await BooksAPI.update(book, book.shelf);
    this.setState(state);
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact={true}
            path="/"
            render={(props) => (
              <MYMAINPAGE
                {...this.props}
                state={this.state}
                Addreading={this.Addreading}
              />
            )}
          />
          <Route
            exact={true}
            path="/search"
            render={(props) => (
              <Search
                {...this.props}
                state={this.state}
                Addreading={this.Addreading}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
