import React from 'react';
import Venue from './venue';

function VenueContainer({curVenue, list, setVenue}) {
	return (
		<div className={`venueContainer${!list.length ? "" : " showContainer"}`}>
			<button className="previous">&#8678;</button>
			{list.map((venue, index) => {
				return <Venue
					info={venue}
					key={index}
					index={index}
					curVenue={curVenue}
				/>
			})}
			<button className="next">&#8680;</button>
		</div>
	);
}

export default VenueContainer;