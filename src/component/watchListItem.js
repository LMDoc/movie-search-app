import React, { Component } from 'react';

class WatchListItem extends Component {

	handleClick(title) {
		this.props.watchListRemove(title)
	}

	render() {
		return (
			<li> <i className="fas fa-times" onClick={(title) => this.handleClick(this.props.movie)}></i> {this.props.movie} </li>
		)
	}
}

export default WatchListItem;