import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

export const ProfileCard = ({ firstName, lastName, email, balance }) => {
	return (
		<div className='avatar'>
			<img src='img/avatar.png' alt='' />
			<h3>
				{firstName} {lastName}
			</h3>
			<Link> {email} </Link>
			<div className='ballance'> {balance} </div>
		</div>
	)
}
