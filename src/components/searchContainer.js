import React from 'react';

function SearchContainer ({changePrice, lat, lng, loc, getVenues, price, range, rangeUpdate, searching}) {
	return (
		<div className={`searchContainer${!loc || (lat === 0 && lng === 0) ? '' : ' hideContainer'}`}>
			<button className="witfBtn"></button>
			<div className="options">
				<div className="rangeContainer">
					<span>Range</span>
					<input 
						className="range"
						type="number"
						min="1"
						max="5"
						placeholder={(range / 1000)}
						value={range / 1000}
						onChange={rangeUpdate}
					/>
					Km
				</div>
				<button className={`findBtn${searching ? " disableBtn" : ""}`} onClick={() => getVenues()}>
					<span role="img" aria-label="location">&#x1F4CD;</span>
					Find me
				</button>
				<div className="priceContainer">
					<span>Price</span>
					<form>
						<label htmlFor="cheap" onClick={() => changePrice(1)} style={price >= 1 ? {color: '#cc3333'} : {color:'rgba(0,0,0,0.5)'}}>$</label>
						<label htmlFor="okay" onClick={() => changePrice(2)} style={price >= 2 ? {color: '#cc3333'} : {color:'rgba(0,0,0,0.5)'}}>$</label>
						<label htmlFor="more" onClick={() => changePrice(3)} style={price >= 3 ? {color: '#cc3333'} : {color:'rgba(0,0,0,0.5)'}}>$</label>
						<label htmlFor="expensive" onClick={() => changePrice(4)} style={price >= 4 ? {color: '#cc3333'} : {color:'rgba(0,0,0,0.5)'}}>$</label>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SearchContainer;