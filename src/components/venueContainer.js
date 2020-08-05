import React from 'react';
import Venue from './venue';

function VenueContainer({curVenue, list, setVenue}) {
	const incrementVenue = (change) => {
		let newValue = curVenue + change;
		setVenue(
			newValue < 0 || newValue >= list.length ? curVenue : newValue
		)
	}
	return (
		<div className={`venueContainer${!list.length ? "" : " showContainer"}`}>
			<button 
				className={`previous${curVenue === 0 ? " hideArrow" : ""}`}
				onClick={() => incrementVenue(-1)}>
					<span>&#129068;</span>
			</button>
			{list.map((venue, index) => {
				return <Venue
					info={venue}
					key={index}
					index={index}
					curVenue={curVenue}
				/>
			})}
			<button 
				className={`next${curVenue === (list.length - 1) ? " hideArrow" : ""}`}
				onClick={() => incrementVenue(1)}>
					<span>&#129070;</span>
			</button>
		</div>
	);
}

export default VenueContainer;