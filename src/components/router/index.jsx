import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Line, Live, Contact, Registration, Profile } from '@app/features'

export const Router = () => {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={Line} />
				<Route path='/live' component={Live} />
				<Route path='/contact' component={Contact} />
				<Route path='/registration' component={Registration} />
				<Route path='/profile' component={Profile} />
			</Switch>
		</div>
	)
}
