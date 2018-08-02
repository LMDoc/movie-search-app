import React, { Component } from "react";

class WatchStar extends Component {

	starOnClick() {
		this.props.addToWatchList();
	}
	
	render() {
		let checkArr = this.props.toWatchList.map(m => m.Title);

		if(!checkArr.includes(this.props.movie.Title)) {

			return (
				<i id="watchStar" className="far fa-star" onClick={() => this.starOnClick()} ></i>
			);
		} 

		if(checkArr.includes(this.props.movie.Title)) {
			return (
				<i id="watchStar" className="fas fa-star" onClick={() => this.starOnClick()} ></i>
			);
		}	
	}
}

export default WatchStar;