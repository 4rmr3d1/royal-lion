import React from 'react';
import {Route, Switch} from "react-router-dom";

import {Line} from './line';
import {Live} from './live';
import {Contact} from './contact';
import {Registration} from './registration';

const Content = () => {
  return(
    <div>
        <Switch>
          <Route exact path="/" component={Line} />
          <Route path="/live" component={Live} />
          <Route path="/contact" component={Contact} />
          <Route path="/registration" component={Registration} />
        </Switch>
    </div>
  )
}

export default Content;
