import alt from "../alt";

import wizardActions from "../actions/wizard-actions";

class WizardStore {

  constructor() {
    this.registeredCourses = [];
    this.bindAction(wizardActions.updateRegisteredCourses, this.handleUpdatedCourses);
  }

  handleUpdatedCourses(registeredCourses) {
    this.registeredCourses = registeredCourses;
  }
}

export default alt.createStore(WizardStore);
