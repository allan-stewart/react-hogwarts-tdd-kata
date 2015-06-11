import React from "react";

import Catalog from "./catalog";
import Alert from "./alert";
import CatalogRepository from "../repositories/catalog-repository";


export default class CatalogPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.catalog = CatalogRepository.getAll();
  }

  render() {
    var alertData = this.state.registrationResponse || {};
    return (
      <div>
        <div className="jumbotron" style={{"padding": "10px"}}>
          <h1>Hogwarts course catalog!</h1>
          <p>Select your wizarding classes!</p>
        </div>
        <div>
          <Alert error={alertData.error} message={alertData.message} />
          <div className="panel panel-default" >
            <Catalog />
          </div>
        </div>
      </div>
    );
  }
}
