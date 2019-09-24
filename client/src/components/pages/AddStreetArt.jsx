import React, { Component } from 'react';
import api from '../../api';

export default class NewStreetArt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: '',
			lng: '',
			pictureUrl: null
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.addStreetArtAndRedirectToDetailPage = this.addStreetArtAndRedirectToDetailPage.bind(this);
		this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
	}
	getCurrentCoordinates() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log('The current coords are', position.coords);
				this.setState({
					lng: position.coords.longitude,
					lat: position.coords.latitude
				});
			});
		}
	}
	handleInputChange(e) {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}
	handleFileChange(e) {
		console.log('The file added by the use is: ', e.target.files[0]);
		this.setState({
			pictureUrl: e.target.files[0]
		});
	}
	addStreetArtAndRedirectToDetailPage(e) {
		// To send information with "form-data" (like in Postman)
		const uploadData = new FormData();
		uploadData.append('lng', this.state.lng);
		uploadData.append('lat', this.state.lat);
		uploadData.append('pictureUrl', this.state.pictureUrl);

		api
			.addStreetArt(uploadData)
			.then((createdStreetArt) => {
				// Redirect the user to another page
				this.props.history.push('/list');
				console.log(this.props.history);
			})
			.catch((err) => {
				console.log('Error while adding the street art: ', err);
			});
	}
	render() {
		return (
			<div className="container NewStreetArt">
				<h1>New Street Art</h1>

				<button className="btn btn-block btn-outline-danger my-4" onClick={this.getCurrentCoordinates}>
					Get Current Coordinates
				</button>

				<div className="row my-4">
					<div className="col-sm-3">
						<label>Coordinates</label>
					</div>
					<div className="col">
						<input
							className="form-control"
							type="number"
							value={this.state.lng}
							onChange={this.handleInputChange}
							name="lng"
							placeholder="Longitude"
						/>
					</div>
					<div className="col">
						<input
							className="form-control"
							type="number"
							value={this.state.lat}
							onChange={this.handleInputChange}
							name="lat"
							placeholder="Latitude"
						/>
					</div>
				</div>

				<div className="row my-4">
					<div className="col-sm-3">
						<label>Picture</label>
					</div>
					<div className="col">
						<input
							className="form-control"
							type="file"
							name="pictureUrl"
							onChange={this.handleFileChange}
						/>
					</div>
				</div>

				<button className="btn btn-block btn-danger my-4" onClick={this.addStreetArtAndRedirectToDetailPage}>
					Add Street Art
				</button>
			</div>
		);
	}
}
