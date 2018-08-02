import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import MovieList from './component/movieList';
import SearchBar from './component/search_bar';
import SelectedMovie from './component/selectedMovie';
import LoadingIcon from './loading_spinner.gif';


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
    //sets local storage to state if available
      let local = localStorage.getItem('watchListLocal')
      let list = JSON.parse(local);
      if(list) {
      this.setState({toWatchList: list})
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
    let checkArr = this.state.toWatchList.map(m => m.Title);

    //adds to list if movie isn't there already
    if(!checkArr.includes(this.state.selectedMovie.Title)) {
      let newArr = [...this.state.toWatchList, this.state.selectedMovie]
      this.setState({ toWatchList: newArr })
    }

    if(checkArr.includes(this.state.selectedMovie.Title)) {
      this.watchListRemove(this.state.selectedMovie)
    }
  }

  watchListRemove(title) {
      let newArr = [...this.state.toWatchList].filter(m => m.Title !== title.Title);
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
            <img src={LoadingIcon} alt="loading-icon" />
          </div>
        </div>
      )
    }
    
    return (
      <div className="page">
        <div className="container">
          <h1 className="title" id="yellow">Quick Movie Facts!</h1>
          <SearchBar onSearchTermChange={(term) => this.movieSearch(term)} toWatchList={this.state.toWatchList} watchListRemove={(title) => this.watchListRemove(title)} onMovieSelect={(selectedMovie) => this.selectedMovieSearch(selectedMovie)} />
          <MovieList movies={this.state.movies.Search} onMovieSelect={(selectedMovie) => this.selectedMovieSearch(selectedMovie)} />
        </div>
        <SelectedMovie  movie={ this.state.selectedMovie} toWatchList={ this.state.toWatchList } addToWatchList={ () => this.addToWatchList() } />
      </div>
    );
  }
}

export default App;
