import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import VenueContainer from './components/venueContainer';
import MapOverlay from './components/mapOverlay';
import SearchContainer from './components/searchContainer';

function App() {
	const getVenues = () => {
		const endPoint = "https://api.foursquare.com/v2/venues/explore?";
		const params = {
			client_id: "NAVENW2HU2XT13XMVHCII1JKPRLTXCWEV0TXT1NF2Z4BCZNI",
			client_secret: "TXVHWKA3UMMHFBN1FI1FSMEHKRS4XI2EQLRE12BP5UUFHXUO",
			ll: [lat, lng],
			query: "food",
			radius: range,
			price: 1,prices,
			limit: 50,
			v: 20180323
		}
		Axios.get(endPoint + new URLSearchParams(params)).then(response => {
			setList(response.data.response.groups[0].items);
			setLoc(true);
		}, (err) => {
			alert("Location not found!\nMake sure 'Location Services' is enabled!");
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
		setCurVenue(index);
	}
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLat(position.coords.latitude);
			setLng(position.coords.longitude);
		})
	})
	const [list, setList] = useState([]);
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [loc, setLoc] = useState(false);
	const [range, setRange] = useState(2000);
	const [prices, setPrices] = useState(2);
	const [curVenue, setCurVenue] = useState(0);
	return (
		<div className="App">
			<SearchContainer
				lat={lat}
				lng={lng}
				loc={loc}
				rangeUpdate={rangeUpdate}
				getVenues={getVenues}
				range={range}
				price={prices}
				changePrice={setPrices}
			/>
			<VenueContainer
				list={list}
				curVenue={curVenue}
				setVenue={setVenue}
			/>
			<MapOverlay 
				style={{display: !loc ? 'none' : 'block'}}
				list={list}
				lat={lat}
				lng={lng}
				loc={loc}
				curVenue={curVenue}
			/>
		</div>
	)
}

export default App;