import React from "react";
import Router from "react-router";

var { Route, RouteHandler, Link } = Router;

//import alt from "./alt";

import Catalog from "./components/catalog";
import Schedule from "./components/schedule";


class App extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to="sorting" >sorting</Link></li>
          <li><Link to="catalog" >catalog</Link></li>
          <li><Link to="schedule" >schedule</Link></li>
        </ul>
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
