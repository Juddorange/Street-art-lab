import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function List(props) {
	const [ streetArt, setStreetArt ] = useState([]);
	useEffect(() => {
		api
			.getStreetArts()
			.then((art) => {
				setStreetArt(art);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="StreetArt">
			<h2>List of Street Arts</h2>
			<table>
				<thead>
					<tr>
						<th>Picture</th>
						<th>Google maps Direction</th>
						<th>Detail</th>
						<th>Visit</th>
					</tr>
				</thead>
				<tbody>
					{streetArt.map((c, i) => {
						return (
							<tr key={i}>
								<td>
									<img src={c.pictureUrl} alt="street art" style={{ width: '200px' }} />
								</td>
								<td>
									{c.location.coordinates[0]} : {c.location.coordinates[1]}
								</td>
								<td>
									<Link to={'/street-art-detail/' + c._id}>Detail</Link>
								</td>
								<td>
									{props.hasVisited(c._id) ? (
										<button onClick={() => props.deleteVisit(c._id)}>Visited</button>
									) : (
										<button onClick={() => props.addVisit(c._id)}>Add a visit</button>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
