import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Container from './components/container';
import Overlay from './components/overlay';

function App() {
	const getAPI = (lat, lng) => {
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
			<button className={`findMeBtn ${loc ? 'hideBtn' : ''}`} onClick={() => getAPI(lat, lng)} ></button>
			<Container list={list} />
			<Overlay
				list={list}
				lat={lat}
				lng={lng}
				loc={loc}
			/>
		</div>
	)
}

export default App;