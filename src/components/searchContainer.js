import React from 'react';
import {OpenStreetMapProvider} from 'leaflet-geosearch';

function SearchContainer ({addr, changePrice, lat, lng, loc, getVenues, price, range, rangeUpdate, searching, setLat, setLng, searchUpdate}) {
	const provider = new OpenStreetMapProvider();
	const getAddress = () => {
		let latitude = 0;
		let longitude = 0;
		if (addr) {
			provider.search({query: addr})
				.then(res => {
					console.log(res);
					if (res.length) {
						console.log('working');
						setLat(res[0].y);
						setLng(res[0].x);
						latitude = res[0].y;
						longitude = res[0].x;
					}
			}).then(() => {
				getVenues(latitude, longitude);
			})
		}
		else {
			getVenues();
		}
	}
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
				<button className={`findBtn${searching ? " disableBtn" : ""}`} onClick={() => getAddress()}>
					<span role="img" aria-label="location">&#x1F4CD;</span>
					Find me
				</button>
				<input 
					onKeyDown={(e) => {if (e.key === "Enter") {getAddress()}}}
					className="searchBar" 
					placeholder="Or enter your location"
					type="text"
					value={addr}
					onChange={searchUpdate}
				/>
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