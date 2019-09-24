import React from 'react';
import api from '../api';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

function MainNavbar(props) {
	function handleLogoutClick(e) {
		api.logout();
	}
	return (
		<nav className="App-header">
			<NavLink to="/" exact>
				MERN Street Art
			</NavLink>
			<NavLink to="/list">List</NavLink>
			<NavLink to="/map">Map</NavLink>
			<NavLink to="/new-street-art">New Street Art</NavLink>
			{!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
			{!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
			{api.isLoggedIn() && (
				<Link to="/" onClick={handleLogoutClick}>
					Logout
				</Link>
			)}
		</nav>
	);
}

export default withRouter(MainNavbar);
