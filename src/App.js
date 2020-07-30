import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Container from './components/container';
import Overlay from './components/overlay';

function App() {
	const getVenues = (lat, lng) => {
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
	return (
		<div className="App">
			<div className="searchContainer">
				<button className="findBtn" ><span role="img" aria-label="location">&#x1F4CD;</span> Find me</button>
				<input className="searchBar" placeholder="Enter your location"></input>
				<button className={`witfBtn ${!loc || (lat === 0 && lng === 0) ? 'hideBtn' : ''}`} onClick={() => getVenues(lat, lng)} ></button>
			</div>
			<Container list={list} />
			<Overlay style={{display: !loc ? 'none' : 'block'}}
				list={list}
				lat={lat}
				lng={lng}
				loc={loc}
			/>
		</div>
	)
}

export default App;