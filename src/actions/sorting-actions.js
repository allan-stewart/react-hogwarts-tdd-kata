import alt from '../alt';

class SorterActions {
  sortingRequested() {
    this.dispatch();
  }
}

export default alt.createActions(SorterActions);
