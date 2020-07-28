import React from 'react';
import './App.css';
import Axios from 'axios';
import Container from './components/container';
import Overlay from './components/overlay';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			lat: 0,
			lng: 0,
			locationFound: false
		}
	}
	getAPI = (lat, lng) => {
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
			this.setState({
				list: response.data.response.groups[0].items,
				locationFound: true 
			})
		})
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			})
		})
	}
	render() {
		return (
			<div className="App">
				<button className={`findMeBtn ${this.state.locationFound ? 'hideBtn' : ''}`} onClick={() => this.getAPI(this.state.lat, this.state.lng)} ></button>
				<Container list={this.state.list} />
				<Overlay
					list={this.state.list}
					lat={this.state.lat}
					lng={this.state.lng}
					locationFound={this.state.locationFound}
				/>
			</div>
		)
	}
}