import React, { Component } from 'react';
import WatchListItem from './watchListItem';

class WatchList extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			clicked: false,
		})
	}

	styleNone = {
		display: "none",
	}

	styleShow = {
		display: "block",
	}

	handleClick() {
		this.setState({clicked: !this.state.clicked});
	}

	render() {

		if(this.props.toWatchList && this.state.clicked === true) {
			const watchListItems = this.props.toWatchList.map((movie) => {
				return (
					<WatchListItem 
						key={movie} 
						movie={movie} 
						watchListRemove={ (title) => this.props.watchListRemove(title)} 
					/>
				);
			});

		if(watchListItems.length > 0) {
		return (
			<div>
				<h3 className="watchListTitle" onClick={() => this.handleClick()}>Watch List</h3>
				<ul className="watchList" style={this.styleShow}>
					{ watchListItems }
				</ul>
			</div>
			)
		}

		if(watchListItems.length === 0) {
			return (
			<div>
				<h3 className="watchListTitle" onClick={() => this.handleClick()}>Watch List</h3>
				<ul className="watchList" style={this.styleShow}>
					<p>Star Movies to add to list</p>
				</ul>
			</div>
			)
		}
	}

		return(
			<div>
				<h3 className="watchListTitle" onClick={() => this.handleClick()}>Watch List</h3>
				<ul className="watchList" style={this.styleNone}></ul>
			</div>
		)
	}
};

export default WatchList;