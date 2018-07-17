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
      toWatchList: [],
    };

    this.movieSearch('Star Wars')
  }

  componentWillMount() {
      if(localStorage) {
      let local = JSON.parse(localStorage.getItem('watchListLocal'));
      this.setState({toWatchList: local})
    }
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

  addToWatchList() {
    //adds to list if movie isn't there already
    if(!this.state.toWatchList.includes(this.state.selectedMovie.Title)) {
      let newArr1 = this.state.toWatchList.slice();
      newArr1.push(this.state.selectedMovie.Title);
      this.setState({ toWatchList: newArr1 })
    }

    //removes movie if on the list
    if(this.state.toWatchList.includes(this.state.selectedMovie.Title)) {
      let newArr2 = this.state.toWatchList.slice();
      let index = newArr2.indexOf(this.state.selectedMovie.Title);
      newArr2.splice(index, 1);
      this.setState({ toWatchList: newArr2 })
    }
  }

  watchListRemove(title) {
      let newArr = this.state.toWatchList.slice();
      let index = newArr.indexOf(title);
      console.log(index);
      newArr.splice(index, 1);
      this.setState({ toWatchList: newArr })
  }

  storeLocal(input) {
    let arr = JSON.stringify(input);
    localStorage.setItem('watchListLocal', arr);
  }

  render() {
    const movieSearch = _.debounce((term) => { this.movieSearch(term) }, 300)
    this.storeLocal(this.state.toWatchList);

     if(!this.state.movies.Search) {
      return (
        <div className="container">
          <SearchBar onSearchTermChange={(term) => this.movieSearch(term)} />
          <div className="loader">
            <h1>Just a moment...</h1>
            <img src="./public/images/loading_spinner.gif" />
          </div>
        </div>
      )
    }

    return (
      <div className="page">
        <div className="container">
          <h1 className="title" id="yellow">Quick Movie Facts!</h1>
          <SearchBar onSearchTermChange={(term) => this.movieSearch(term)} toWatchList={this.state.toWatchList} watchListRemove={(title) => this.watchListRemove(title)}/>
          <MovieList movies={this.state.movies.Search} onMovieSelect={(selectedMovie) => this.selectedMovieSearch(selectedMovie)} />
        </div>
        <SelectedMovie  movie={ this.state.selectedMovie} toWatchList={ this.state.toWatchList } addToWatchList={ () => this.addToWatchList() } />
      </div>
    );
  }
}

export default App;
