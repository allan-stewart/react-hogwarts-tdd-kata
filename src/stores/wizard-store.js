import alt from "../alt";

import wizardActions from "../actions/wizard-actions";

class WizardStore {

  constructor() {
    this.wizard = {};
    this.bindAction(wizardActions.updateWizard, this.handleUpdatedWizard);
  }

  handleUpdatedWizard(wizard) {
    this.wizard = wizard;
  }
}

export default alt.createStore(WizardStore);
