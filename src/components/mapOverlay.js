import React from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import homeIcn from '../images/homeIcon.png';
import venueIcn from '../images/venueIcon.png';


function MapOverlay({curVenue, list, lat, lng, loc, snapLoc}) {
	const curPosition = [lat, lng];
	let homeIcon = L.icon({
		iconUrl: homeIcn,
		iconSize: [25, 41],
		iconAnchor: [12.5, 41],
		popupAnchor: [0, -41]
	})
	let foodIcon = L.icon({
		iconUrl: venueIcn,
		iconSize: [20, 32.8],
		iconAnchor: [10, 32.8],
		popupAnchor: [0, -32.8]
	})
	return (
		<div className={`overlay${loc ? ' show' : ''}`} >
			<Map className={`map${loc ? ' show' : ''}`} center={snapLoc.length ? snapLoc : curPosition} zoom={13} minZoom={12} maxZoom={15} >
				<TileLayer
				attribution='' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={curPosition} icon={homeIcon} key='home'>
					<Popup>
						Your Location <br /> {lat.toFixed(3)} <br /> {lng.toFixed(3)}
					</Popup>
				</Marker>
				{list.map((venue, index) => {
					const coords = venue.venue.location.labeledLatLngs[0];
					return curVenue === index ? 
							<Marker position={[coords.lat, coords.lng]} icon={foodIcon} key={index}>
								<Popup>
									{venue.venue.name} <br /> {coords.lat.toFixed(3)} <br /> {coords.lng.toFixed(3)}
								</Popup>
							</Marker> 
						: ''
				})}
			</Map>
		</div>
	);
}

export default MapOverlay;