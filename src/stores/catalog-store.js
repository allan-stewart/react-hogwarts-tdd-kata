import alt from "../alt";

import catalogActions from "../actions/catalog-actions";

class CatalogStore {

  constructor() {
    this.catalog = [];
    this.bindAction(catalogActions.updateCatalog, this.handleUpdateCatalog);
  }

  handleUpdateCatalog(catalog) {
    this.catalog = catalog;
  }
}

export default alt.createStore(CatalogStore);

