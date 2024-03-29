import React, {useState, useEffect} from 'react';
import './App.scss';
import Axios from 'axios';
import VenueContainer from './components/venueContainer';
import MapOverlay from './components/mapOverlay';
import SearchContainer from './components/searchContainer';

function App() {
	const getVenues = (latitude, longitude) => {
		setSearching(true);
		if (latitude || longitude) {
			setLat(latitude);
			setLng(longitude);
		}
		const endPoint = "https://api.foursquare.com/v2/venues/explore?";
		const params = {
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
			ll: latitude || longitude ? [latitude, longitude] : [lat, lng],
			query: "food",
			radius: range,
			price: 1,prices,
			limit: 50,
			v: 20200806
		}
		Axios.get(endPoint + new URLSearchParams(params)).then(response => {
			setList(response.data.response.groups[0].items);
			setLoc(true);
		}, (err) => {
			alert("Location not found!\nMake sure 'Location Services' is enabled, or address is entered correctly!");
			setSearching(false);
		})
	}
	const rangeUpdate = (e) => {
			let srcVal = e.target.value;
			if (srcVal < 1) {
                srcVal = 1;
            }
            else if (srcVal > 5) {
				srcVal = 5
			}
			setRange(srcVal * 1000);
	}
	const setVenue = (index) => {
		if (index >= list.length) {
			return;
		}
		else {
			setCurVenue(index);
			//Snap overlay to location between home marker and venue marker
			const venueLoc = list[index].venue.location;
			const snapLat = ((venueLoc.lat - lat) / 2) + lat;
			const snapLng = ((venueLoc.lng - lng) / 2) + lng;
			setSnapLoc([snapLat, snapLng]);
		}
	}
	const removeVenue = (index) => {
		if (list.length === 1) {
			setNoOptions(true);
		}
		else if (curVenue >= (list.length - 1)) {
			setVenue(curVenue - 1);
		}
		else {
			setVenue(curVenue);
		}
		if (list.length !== 1) {
			list.splice(index, 1);
			setList(JSON.parse(JSON.stringify(list)));
		}
		setVenue(index);
	}
	const selectedOption = (index) => {
		setList(list.splice(index, 1));
		setCurVenue(0);
		setPickedOption(true);
	}
	const searchUpdate = (e) => {
		//Regex for illegal characters
		let srcVal = e.target.value;
		const regExp = /[^\w\s-]/g;
		if (srcVal.match(regExp)) {
			srcVal = srcVal.replace(regExp, '');
		}
		inputAddr(srcVal);
	}
	useEffect(() => {
		if (lat === 0 && lng === 0) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
			})
		}
	})
	const [list, setList] = useState([]);
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [loc, setLoc] = useState(false);
	const [range, setRange] = useState(2000);
	const [prices, setPrices] = useState(2);
	const [curVenue, setCurVenue] = useState(0);
	const [snapLoc, setSnapLoc] = useState([]);
	const [searching, setSearching] = useState(false);
	const [noOptions, setNoOptions] = useState(false);
	const [pickedOption, setPickedOption] = useState(false);
	const [addr, inputAddr] = useState('');
	return (
		<div className="App">
			<SearchContainer
				lat={lat}
				setLat={setLat}
				lng={lng}
				setLng={setLng}
				loc={loc}
				rangeUpdate={rangeUpdate}
				getVenues={getVenues}
				range={range}
				price={prices}
				changePrice={setPrices}
				searching={searching}
				addr={addr}
				searchUpdate={searchUpdate}
			/>
			<VenueContainer
				list={list}
				curVenue={curVenue}
				removeVenue={removeVenue}
				setVenue={setVenue}
				noOptions={noOptions}
				pickedOption={pickedOption}
				selectedOption={selectedOption}
			/>
			<MapOverlay 
				style={{display: !loc ? 'none' : 'block'}}
				list={list}
				lat={lat}
				lng={lng}
				loc={loc}
				curVenue={curVenue}
				snapLoc={snapLoc}
			/>
		</div>
	)
}

export default App;