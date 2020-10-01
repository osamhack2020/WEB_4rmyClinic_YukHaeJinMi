import React from 'react';

export default function Card(props:any){
	return(
		<div className="card">
			<div className="card-title">{props.title}</div>
			<div className="card-body">{props.body}</div>
			<div className="card-profile">
				<div className="card-profile-img">{props.img}</div>
				<div className="card-profile-id">{props.id}</div>
			</div>
		</div>
	)
}