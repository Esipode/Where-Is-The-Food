import React from 'react';

function Venue({info}) {
	return (
		<div className="venue">
			<h2>{info.venue.name}</h2>
			<div className='infoContainer'>
				<h4>{((info.venue.location.distance)/1000).toFixed(2)} Km away</h4>
				<h3>{info.venue.categories[0].name}</h3>
			</div>
		</div>
	);
}

export default Venue;