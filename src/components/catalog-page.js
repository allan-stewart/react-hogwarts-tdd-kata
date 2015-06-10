import React from "react";

import Catalog from "./catalog";
import CatalogRepository from "../repositories/catalog-repository";


export default class CatalogPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.catalog = CatalogRepository.getAll();
  }

  render() {
    return (
      <Catalog />
    );
  }
}
