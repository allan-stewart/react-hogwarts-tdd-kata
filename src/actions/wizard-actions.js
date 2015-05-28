import alt from "../alt";
import WizardRepository from "../repositories/wizard-repository";

class WizardActions {

  getWizard() {
    WizardRepository.get()
      .then((wizard) => {
        this.actions.updateWizard(wizard);
      })
      .catch((errorMessage) => {
        this.actions.updateWizardFailed(errorMessage);
      });
  }

  updateWizard(wizard) {
    this.dispatch(wizard);
  }

  updateWizardFailed(message) {
    console.log("Failed to update wizard: " + message);
    throw message;
  }
}

export default alt.createActions(WizardActions);
