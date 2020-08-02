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
			radius: 2500,
			limit: 50,
			v: 20180323
		}
		Axios.get(endPoint + new URLSearchParams(params)).then(response => {
			setList(response.data.response.groups[0].items);
			setLoc(true);
		})
	}
	// const searchUpdate = (e) => {
	// 		let srcVal = e.target.value;
	// 		const regExp = /[^,\w\s-]/g;
	// 		if (srcVal.match(regExp)) {
	// 			srcVal = srcVal.replace(regExp, '');
	// 		}
	// 		inputAddr(srcVal);
	// }
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
	// const [addr, inputAddr] = useState('');
	return (
		<div className="App">
			<SearchContainer 
				// addr={addr}
				// searchUpdate={searchUpdate}
				lat={lat}
				lng={lng}
				loc={loc}
				getVenues={getVenues}
			/>
			<VenueContainer list={list} />
			<MapOverlay style={{display: !loc ? 'none' : 'block'}}
				list={list}
				lat={lat}
				lng={lng}
				loc={loc}
			/>
		</div>
	)
}

export default App;