import React from "react";
import _ from "lodash";

import alt from "./src/alt";

import Course from "./src/components/course";

//////////////////////////
// Actions
//////////////////////////

export class CatalogActions {

  updateCatalog(catalog) {
    this.dispatch(catalog);
  }

  getCatalog() {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();

    CatalogRepository.getAll()
      .then((catalog) => {
        this.actions.updateCatalog(catalog);
      })
      .catch((errorMessage) => {
        this.actions.updateCatalogFailed(errorMessage);
      });
  }

  updateCatalogFailed(message) {
    console.log("Failed to update catalog " + message);
    throw message;
  }

}

var catalogActions = alt.createActions(CatalogActions);


//////////////////////////
// Repository
//////////////////////////

var catalogData = [
  {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 },
  {id: "AR205", name: "Arithmancy", startTime: new Date(0,0,0,9), professor: "Septima Vector", credits: 3 },
  {id: "AST101", name: "Astronomy", startTime: new Date(0,0,0, 11), professor: "Aurora Sinistra", credits: 3 },
  {id: "MC101", name: "Care of Magical Creatures", startTime: new Date(0,0,0,14), professor: "Rubeus Hagrid", credits: 2 },
  {id: "CH105", name: "Charms", startTime: new Date(0,0,0,11), professor: "Filius Flitwick", credits: 3 },
  {id: "DDA302-10", name: "Defence Against the Dark Arts", startTime: new Date(0,0,0,10), professor: "Severus Snape", credits: 4 },
  {id: "DDA302-13", name: "Defence Against the Dark Arts", startTime: new Date(0,0,0,13), professor: " Quirinus Quirrell", credits: 4 },
  {id: "DIV201-13", name: "Divination", startTime: new Date(0,0,0,13), professor: " Sibyll Trelawney", credits: 3 },
  {id: "DIV201-10", name: "Divination", startTime: new Date(0,0,0,10), professor: "Firenze (Centaur)", credits: 3 },
  {id: "FLY101", name: "Flying", startTime: new Date(0,0,0,9), professor: "Madam Hooch", credits: 2 },
  {id: "HERB201", name: "Herbology", startTime: new Date(0,0,0,14), professor: "Pomona Sprout", credits: 4 },
  {id: "HM101", name: "History of Magic", startTime: new Date(0,0,0,11), professor: "Cuthbert Binns", credits: 3 },
  {id: "MUG101", name: "Muggle Studies", startTime: new Date(0,0,0,9), professor: "Alecto Carrow", credits: 2 },
  {id: "POT108", name: "Potions", startTime: new Date(0,0,0,15), professor: "Severus Snape", credits: 4 },
  {id: "TRN205", name: "Transfiguration", startTime: new Date(0,0,0,13), professor: "Minerva McGonagall", credits: 4 }
];

export class CatalogRepository {

  static save() { }

  static getAll() {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      setTimeout(function () {

        // resolve with some mock data
        resolve(catalogData);
      }, 250);
    });
  }

  static findById(itemId) { }

}

//////////////////////////
// Stores
//////////////////////////

export class CatalogStore {

  constructor() {
    this.catalog = [];
    this.bindAction(catalogActions.updateCatalog, this.handleUpdateCatalog);
  }

  handleUpdateCatalog(catalog) {
    this.catalog = catalog;
  }
}

var catalogStore = alt.createStore(CatalogStore);

//////////////////////////
// Components
//////////////////////////

export class RegistrationResponse extends React.Component {

  render() {
    var response = this.props.response;
    var message;
    if (response) {
      var classString = "alert ";
      if (response.success) {
        classString += "alert-success";
        message = <div className={classString}>Successfully registered</div>;
      } else {
        classString += "alert-danger";
        message = <div className={classString}>{response.message}</div>;
      }
    }
    return {message};
  }
}

export class Catalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = catalogStore.getState();
  }

  componentDidMount() {
    catalogStore.listen(this.onChange.bind(this));
    catalogActions.getCatalog();
  }

  componentWillUnmount() {
    catalogStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Hogwarts course catalog!</h1>
          <p>Select your wizarding classes!</p>
        </div>
        <div>
          <div className="panel panel-default" >

            <table className="table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Time</th>
                  <th>Professor</th>
                  <th>Credits</th>
                </tr>
              </thead>

              <tbody>
                { _.map(this.state.catalog, item => <Course course={item} /> ) }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<Catalog />, document.getElementById("app"));
