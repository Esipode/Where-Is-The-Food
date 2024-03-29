import React from 'react';
import Venue from './venue';

function VenueContainer({curVenue, list, noOptions, pickedOption, removeVenue, selectedOption, setVenue}) {
	const incrementVenue = (change) => {
		let newValue = curVenue + change;
		setVenue(
			newValue < 0 || newValue >= list.length ? curVenue : newValue
		)
	}
	return (
		<div className={`venueContainer${!list.length ? "" : " showContainer"}`}>
			<div className="noOptions" style={noOptions ? {display: 'flex'} : {display: 'none'}}>
				<h2>No more options!</h2>
				<p>Stop being so picky!</p>
			</div>
			<div className="pickedOption" style={pickedOption ? {display: 'flex'} : {display: 'none'}}>
				<h2>Congratulations!</h2>
				<p>Now go stuff your face!</p>
			</div>
			<button 
				className={`previous${curVenue === 0 ? " hideArrow" : ""}`}
				onClick={() => incrementVenue(-1)}>
					<span/>
					<p>Prev</p>
			</button>
			{list.map((venue, index) => {
				return <Venue
					info={venue}
					key={index}
					index={index}
					curVenue={curVenue}
					noOptions={noOptions}
					pickedOption={pickedOption}
				/>
			})}
			<div className="choices">
				<div className="decline" onClick={() => removeVenue(curVenue)}>
					<h2>No</h2>
					<p>I won't eat there</p>
				</div>
				<div className="maybe" onClick={() => setVenue(curVenue + 1)}>
					<h2>Maybe</h2>
					<p>I'll think about it</p>
				</div>
				<div className="okay" onClick={() => selectedOption(curVenue)}>
					<h2>Yes</h2>
					<p>I want to eat there</p>
				</div>
			</div>
			<button 
				className={`next${curVenue === (list.length - 1) ? " hideArrow" : ""}`}
				onClick={() => incrementVenue(1)}>
					<span/>
					<p>Next</p>
			</button>
		</div>
	);
}

export default VenueContainer;