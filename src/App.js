import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import MovieList from './component/movieList';
import SearchBar from './component/search_bar';
import SelectedMovie from './component/selectedMovie';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      selectedMovie: null,
    };

    this.movieSearch('Star Wars')
  }

  async movieSearch(term) {
    // searches for 1 letter bring back too many results which causes the fetch to fail 
    if(term.length > 1) {
      let url = `http://www.omdbapi.com/?apikey=841e740&s=${term}`
      const res = await fetch(url)
      const movies = await res.json();
      
        if(movies.Search) {
          this.setState({ movies });
        }
      }
    }

  async selectedMovieSearch(selectedMovie) {
    let url = `http://www.omdbapi.com/?apikey=841e740&i=${selectedMovie.imdbID}`
    const res = await fetch(url)
    const foundMovie = await res.json();
    this.setState({ selectedMovie: foundMovie })
  }


  render() {
    const movieSearch = _.debounce((term) => { this.movieSearch(term) }, 300)

     if(!this.state.movies.Search) {
      return (
        <div className="container">
          <SearchBar onSearchTermChange={(term) => this.movieSearch(term)} />
          <div className="loader">
            <h1>Just a moment...</h1>
            <img src="http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif" />
          </div>
        </div>
      )
    }

    return (
      <div className="page">
        <div className="container">
          <SearchBar onSearchTermChange={(term) => this.movieSearch(term)} />
          <MovieList movies={this.state.movies.Search} onMovieSelect={(selectedMovie) => this.selectedMovieSearch(selectedMovie)} />
        </div>
        <SelectedMovie  movie={ this.state.selectedMovie} />
      </div>
    );
  }
}

export default App;
