import React from 'react';

function SearchContainer ({addr, lat, lng, loc, getVenues, searchUpdate}) {
	return (
		<div className={`searchContainer${!loc || (lat === 0 && lng === 0) ? '' : ' hideContainer'}`}>
			<button className="findBtn" onClick={() => getVenues()}>
				<span role="img" aria-label="location">&#x1F4CD;</span>
				{/* {addr === '' ? 'Or Find It' : 'Find Me'} */}
				Find me
			</button>
			{/* <input 
				className="searchBar" 
				placeholder="Enter your location"
				type="text"
				value={addr}
				onChange={searchUpdate}
			/> */}
			<button className="witfBtn"></button>
		</div>
	);
}

export default SearchContainer;