import React, { Component } from 'react';

class WatchListItem extends Component {

	handleClick(title) {
		this.props.watchListRemove(title)
	}

	render() {
		return (
			<li> <i className="fas fa-times" onClick={(title) => this.handleClick(this.props.movie)}></i> <span onClick={() => this.props.onMovieSelect(this.props.movie)} > {this.props.movie.Title} </span> </li>
		)
	}
}

export default WatchListItem;