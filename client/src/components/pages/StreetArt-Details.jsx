import React, { useEffect, useState, useRef } from 'react';
import api from '../../api';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoianVkZG9yYW5nZSIsImEiOiJjazB3aHQyMHYwZXBqM2RueHk5djUyYmpxIn0.uuqkgRLrsKCM9TYb5zRDcw';

export default function StreetArtDetail(props) {
	const [ Art, setArt ] = useState([]);
	const mapDomRef = useRef(null);
	let map = useRef(null).current;
	let marker = useRef(null).current;
	useEffect(() => {
		api
			.getStreetArt(props.match.params.streetArtId)
			.then((art) => {
				setArt([ ...Art, art ]);
				let [ lng, lat ] = art.location.coordinates;
				initMap(lng, lat);
			})
			.catch((err) => console.log(err));
	}, []);
	function initMap(lng, lat) {
		map = new mapboxgl.Map({
			container: mapDomRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [ lng, lat ],
			zoom: 10
		});
		map.addControl(new mapboxgl.NavigationControl());

		marker = new mapboxgl.Marker({ color: 'red' }).setLngLat([ lng, lat ]).addTo(map);
	}

	return (
		<div className="StreetArt">
			{console.log('art', Art)}
			<h2>Street Art Detail</h2>
			{Art.map((info) => (
				<div key={info._id}>
					<img src={info.pictureUrl} alt="img" />
					<p>Longitude : {info.location.coordinates[0]}</p>
					<p>Latitude : {info.location.coordinates[1]}</p>
				</div>
			))}
			<div ref={mapDomRef} style={{ height: 400 }} />
		</div>
	);
}
