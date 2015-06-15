
import alt from "../alt";


class HouseStore {

  constructor() {
    this.houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
  }
}

export default alt.createStore(HouseStore);

