import React from 'react'
import { Link } from 'react-router-dom'

import classes from './style.module.scss'

export const ProfileCard = ({ firstName, lastName, email, balance }) => {
	return (
		<div className={classes.avatar}>
			<img src='img/avatar.png' alt='' />
			<h3>
				{firstName} {lastName}
			</h3>
			<Link> {email} </Link>
			<div className={classes.ballance}> {balance} </div>
		</div>
	)
}
