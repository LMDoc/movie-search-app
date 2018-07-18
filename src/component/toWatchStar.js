import React, { Component } from "react";

class WatchStar extends Component {

	starOnClick() {
		this.props.addToWatchList();
	}
	
	render() {
		console.log(this.props.toWatchList)
		if(!this.props.toWatchList.includes(this.props.movie.Title)) {

			return (
				<i id="watchStar" className="far fa-star" onClick={() => this.starOnClick()} ></i>
			);
		} 

		if(this.props.toWatchList.includes(this.props.movie.Title)) {
			return (
				<i id="watchStar" className="fas fa-star" onClick={() => this.starOnClick()} ></i>
			);
		}	
	}
}

export default WatchStar;