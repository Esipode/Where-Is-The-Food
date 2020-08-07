import React from 'react';

function Venue({index, info, curVenue, noOptions, pickedOption}) {
	return (
		<div className="venue" style={curVenue === index ? {display: 'block'} : {display: 'none'}}>
			<h2 className="name">{info.venue.name}</h2>
			<h3 className="category">
				{info.venue.categories[0].name}
			</h3>
			<div className='infoContainer'>
				<h3 className="address">
					{info.venue.location.address}
				</h3>
				<h3 className="distance">
					{((info.venue.location.distance)/1000).toFixed(2)} Km away
				</h3>
			</div>
		</div>
	);
}

export default Venue;