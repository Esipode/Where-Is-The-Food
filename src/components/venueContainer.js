import React from 'react';
import Venue from './venue';

function VenueContainer({list}) {
	return (
		<div className="container">
			{list.map((venue, index) => {
				return <Venue
					info={venue}
					key={index}
				/>
			})}
		</div>
	);
}

export default VenueContainer;