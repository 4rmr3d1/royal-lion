import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Line, Live, Contact, Registration, Profile } from '@app/features'

export const Content = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Line} />
				<Route path='/live' component={Live} />
				<Route path='/contact' component={Contact} />
				<Route path='/registration' component={Registration} />
				<Route path='/profile' component={Profile} />
			</Switch>
		</>
	)
}
