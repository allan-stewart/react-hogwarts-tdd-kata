import React from "react";
import Router from "react-router";
import ReactBootstrap from "react-bootstrap";
import ReactRouterBootstrap from "react-router-bootstrap";

import Catalog from "./components/catalog";
import Schedule from "./components/schedule";


var Nav = ReactBootstrap.Nav
  , NavItemLink = ReactRouterBootstrap.NavItemLink
  , ButtonLink = ReactRouterBootstrap.ButtonLink
;

var { Route, RouteHandler, Link } = Router;

//import alt from "./alt";


class App extends React.Component {

  render () {
    return (
      <div>
        Hogwarts<br />
        <Nav>
          <NavItemLink to="catalog" >
            sorting
          </NavItemLink>
          <NavItemLink to="catalog" >
            catalog
          </NavItemLink>
          <NavItemLink to="schedule" >
            schedule
          </NavItemLink>
        </Nav>
        <RouteHandler />
      </div>
    );
  }

}

var routes = (
  <Route handler={App}>
    <Route name="sorting" />
    <Route name="catalog" handler={Catalog}/>
    <Route name="schedule" handler={Schedule}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("app"));
});
