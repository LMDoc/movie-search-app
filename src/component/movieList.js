import React, { Component } from 'react';
import MovieListItem from './movieListItem';

const MovieList = (props) => {

	const movieItems = props.movies.map((movie) => {
		return (
			<MovieListItem
			onMovieSelect = {props.onMovieSelect}
			movie = {movie}
			key = {movie.imdbID} />
		);
	});

	return (
		<ul>
			{ movieItems }
		</ul>
	)
};

export default MovieList;