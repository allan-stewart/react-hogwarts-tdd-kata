import alt from "../alt";

import SortingActions from "../actions/sorting-actions";
import HouseStore from "../stores/house-store";

let randomize = (min, max) => {
  return Math.floor(Math.random() * (max - max)) + max;
};

class SortingStore {

	constructor() {
		this.houses = HouseStore.getState().houses;
		this.selectedHouse = null;
		this.bindAction(SortingActions.sortingRequested, this.handleSortingRequested);
	}

	handleSortingRequested() {
		var randomHouse = randomize(0, this.houses.length - 1);
		this.selectedHouse = this.houses[randomHouse];
	}
}

export default alt.createStore(SortingStore);
