import React, { Component } from 'react';
import WatchStar from './toWatchStar';

const SelectedMovie = ({ movie, toWatchList, addToWatchList }) => {
	
	if(movie) {
	let ratings = movie.Ratings.map(rating => <li key={rating.Source}><b id="yellow">{rating.Source}:</b> {rating.Value}</li>);
	let poster = movie.Poster == "N/A" ? "http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png" : movie.Poster;
	let imdb = `https://www.imdb.com/title/${movie.imdbID}`;

	return (
		<div className="big-container">
	  		<div className="selected-container">
	  			<div className="poster-frame">
	  				<img src={poster} />
	  				<WatchStar toWatchList={toWatchList} movie={movie} addToWatchList={ () => addToWatchList() } />
	  			</div>
		  		<div className="movie-details">
			  		<h2>{movie.Title} ({movie.Year})</h2>
			  			
		  			<div className="movie-details-header">
						<div className="header-1">
							<p><b id="yellow">Runtime:</b> {movie.Runtime}</p>
							<p><b id="yellow">Released:</b> {movie.Released}</p>
							<p><b id="yellow">Age Rating:</b> {movie.Rated}</p>
						</div>
						<div className="ratings">
							<ul>{ratings}</ul>
						</div>
		  			</div>

		  			<div className="movie-details-main">
		  				<p id="yellow"><b>Plot</b></p>
		  				<p id="genre"><i>{movie.Genre}</i></p>
						<p>{movie.Plot}</p>
						
						<p><b id="yellow">Starring:  </b>{movie.Actors}</p>
						<p><b id="yellow">Language:</b> {movie.Language}</p>
						<p><b id="yellow">Box Office:</b> {movie.BoxOffice}</p>
						<p><b id="yellow">Production:</b> {movie.Production}</p>
						<p><b id="yellow">Full Details:</b> <a href={imdb} target="_blank">IMDB</a></p>
		  			</div>
	  			</div>
	  		</div>
	  	</div>
	  	);
	}

  	return (
  		<div className="big-container">
  			<div className="unselected-container">
  				<h1 id="yellow">WELCOME TO QUICK MOVIE FACTS</h1>
  				<h2>Simply search and select your movie to find information in seconds!</h2>
  			</div>
  		</div>
  	)
}

export default SelectedMovie; 