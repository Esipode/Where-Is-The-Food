import React from 'react';

export default class Venue extends React.Component {
	render() {
		return (
			<div className="venue">
				<h2>{this.props.info.venue.name}</h2>
				<div className='infoContainer'>
					<h4>{((this.props.info.venue.location.distance)/1000).toFixed(2)} Km away</h4>
					<h3>{this.props.info.venue.categories[0].name}</h3>
				</div>
			</div>
		);
	}
}