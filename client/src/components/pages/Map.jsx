import React, { useEffect, useState, useRef } from 'react';
import api from '../../api';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoianVkZG9yYW5nZSIsImEiOiJjazB3aHQyMHYwZXBqM2RueHk5djUyYmpxIn0.uuqkgRLrsKCM9TYb5zRDcw';

export default function Map(props) {
	const [ Arts, setArts ] = useState([]);
	const mapDomRef = useRef(null);
	let map = useRef(null).current;
	let marker = useRef(null).current;
	useEffect(() => {
		api
			.getStreetArts()
			.then((art) => {
				console.log(art);
				setArts([ ...Arts, art ]);
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
			<h2>Map</h2>
			<div ref={mapDomRef} style={{ height: 400 }} />
		</div>
	);
}
