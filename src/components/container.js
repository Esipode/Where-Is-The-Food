import React from 'react';
import Venue from './venue';

export default class Container extends React.Component {
	render() {
		return (
			<div className="container">
				{this.props.list.map((venue, index) => {
					return <Venue
						info={venue}
						key={index}
					/>
				})}
			</div>
		);
	}
}