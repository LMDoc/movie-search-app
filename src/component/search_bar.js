import React, { Component } from 'react';
import WatchList from "./watchList";

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };
	}

	render() {
		return (
			<div className="search-bar">
					<input
					value = {this.state.term}
					onChange={event => this.onInputChange(event.target.value)}
					placeholder="What are you looking for?" />
					<WatchList toWatchList={ this.props.toWatchList } watchListRemove={ (title) => this.props.watchListRemove(title)} />
			</div>
			);
	}

	onInputChange(term) {
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
}

export default SearchBar;