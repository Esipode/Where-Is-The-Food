import React from 'react';

function SearchContainer ({addr, lat, lng, loc, getVenues, searchUpdate}) {
	return (
		<div className="searchContainer">
			<button className="findBtn" ><span role="img" aria-label="location">&#x1F4CD;</span>{addr === '' ? 'Or Find It' : 'Find Me'}</button>
			<input 
				className="searchBar" 
				placeholder="Enter your location"
				type="text"
				value={addr}
				onChange={searchUpdate}
			/>
			<button className={`witfBtn ${!loc || (lat === 0 && lng === 0) ? 'hideBtn' : ''}`} onClick={() => getVenues(lat, lng)} ></button>
		</div>
	);
}

export default SearchContainer;