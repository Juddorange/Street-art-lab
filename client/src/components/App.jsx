import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import Home from './pages/Home';
import List from './pages/List';
import StreetArtDetails from './pages/StreetArt-Details.jsx';
import AddStreetArt from './pages/AddStreetArt';
import Map from './pages/Map';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';

export default function App() {
	const [ userVisits, setUserVisits ] = useState([]);

	useEffect(() => {
		api.getMyVisits().then((userVisits) => setUserVisits(userVisits)).catch((err) => console.log(err));
	}, []);

	const hasVisited = (streetArtId) => {
		for (const visit of userVisits) if (visit._streetArt._id === streetArtId) return true;
		return false;
	};

	const handleAdd = (streetArtId) => {
		api.addVisit(streetArtId).then((res) => setUserVisits([ ...userVisits, res ])).catch((err) => console.log(err));
		hasVisited(streetArtId);
	};

	const handleDelete = (streetArtId) => {
		api
			.deleteVisit(streetArtId)
			.then((response) => setUserVisits([ ...userVisits, response ]))
			.catch((err) => console.log(err));
		hasVisited(streetArtId);
	};

	return (
		<div className="App">
			<MainNavbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route
					path="/list"
					render={() => <List hasVisited={hasVisited} addVisit={handleAdd} deleteVisit={handleDelete} />}
				/>
				<Route path="/street-art-detail/:streetArtId" component={StreetArtDetails} />
				<Route path="/new-street-art" component={AddStreetArt} />
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/map" component={Map} />
				<Route render={() => <h2>404</h2>} />
			</Switch>
		</div>
	);
}
