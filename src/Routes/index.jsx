import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from '../Pages/Home';
import Synopsis from '../Pages/Synopsis';
import Pagina404 from '../Pages/Error';
export default function Routes() {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sinopse/:id" component={Synopsis} />
        <Route component={Pagina404} />
      </Switch>
    </BrowserRouter>)
}