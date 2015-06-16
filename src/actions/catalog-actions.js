import alt from '../alt';
import CatalogRepository from '../repositories/catalog-repository';

class CatalogActions {

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
    throw message;
  }

}

export default alt.createActions(CatalogActions);

