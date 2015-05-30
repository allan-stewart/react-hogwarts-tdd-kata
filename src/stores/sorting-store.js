import alt from "../alt";

import SortingActions from "../actions/sorting-actions";

class SortingStore {

	constructor() {
		this.houses = [ "Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
		this.selectedHouse = null;
		this.bindAction(SortingActions.sortingRequested, this.handleSortingRequested);
	}

	handleSortingRequested() {
		var randomHouse = Math.floor(Math.random() * this.houses.length);
		this.selectedHouse = this.houses[randomHouse];
	}
}

export default alt.createStore(SortingStore);
