import React from "react";
import Router from "react-router";

import alt from "./alt";

import Catalog from "./components/catalog";

//var routes = (
  //<Route handler={App}>
    //<Route name="sorting" handler={Sorting}/>
    //<Route name="catalog" handler={Catalog}/>
    //<Route name="schedule" handler={Schedule}/>
  //</Route>
//);

//Router.run(routes, function (Handler) {
  //React.render(<Handler/>, document.getElementById("app"));
//});



React.render(<Catalog />, document.getElementById("app"));
