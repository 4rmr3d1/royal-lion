import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Activate, Line, Live, Contact, Result, Registration, Profile } from '@app/features'

import classes from './style.module.scss'

export const Content = () => {
  return (
    <div className={classes.container}>
      <Switch>
        <Route
          component={Line}
          exact
          path='/'
        />
        <Route
          component={Live}
          path='/live'
        />
        <Route
          component={Result}
          path='/result'
        />
        <Route
          component={Contact}
          path='/contact'
        />
        <Route
          component={Registration}
          path='/registration'
        />
        <Route
          component={Profile}
          path='/profile'
        />
        <Route
          component={Activate}
          exact
          path='/activate/:id'
        />
      </Switch>
    </div>
  )
}
