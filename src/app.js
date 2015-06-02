import React from "react";
import Router from "react-router";
import ReactBootstrap from "react-bootstrap";
import ReactRouterBootstrap from "react-router-bootstrap";

import Catalog from "./components/catalog";
import Schedule from "./components/schedule";
import Sorting from "./components/sorting";

var Nav = ReactBootstrap.Nav
  , NavItemLink = ReactRouterBootstrap.NavItemLink
;

var { Route, RouteHandler, DefaultRoute } = Router;

//import alt from "./alt";


class App extends React.Component {

  render () {
    return (
      <div style={{"padding": "10px"}}>
        <div className="navbar navbar-inverse">
          <div className="navbar-header navbar-brand" style={{"color": "white"}}>
            Hogwarts
          </div>
          <Nav className="nav navbar-nav">
            <NavItemLink to="sorting" >
              sorting
            </NavItemLink>
            <NavItemLink to="catalog" >
              catalog
            </NavItemLink>
            <NavItemLink to="schedule" >
              schedule
            </NavItemLink>
          </Nav>
        </div>
        <RouteHandler />
      </div>
    );
  }

}

var routes = (
  <Route handler={App}>
    <Route name="sorting" handler={Sorting}/>
    <Route name="catalog" handler={Catalog}/>
    <Route name="schedule" handler={Schedule}/>
    <DefaultRoute handler={Sorting}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("app"));
});
