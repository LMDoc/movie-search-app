import React, { Component } from 'react';

const MovieListItem = (props) => {
	let poster = props.movie.Poster == "N/A" ? "http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png" : props.movie.Poster;
	let title = props.movie.Title.length > 30 ? `${props.movie.Title.slice(0,50)}...` : props.movie.Title;

	return (
		<li onClick={() => props.onMovieSelect(props.movie)} className='card'>
			<p className="small-text">{title}</p>
			<div className="card-img">
				<img src={poster} />
			</div>
		</li>
	)
}

export default MovieListItem;