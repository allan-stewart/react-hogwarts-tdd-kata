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
    this.dispatch(message);
  }

  registerForCourse(course) {
    WizardRepository.get()
      .then((wizard) => {
        wizard.courses.push(course);
        WizardRepository.save(wizard)
          .then(() => {
            this.actions.updateWizard(wizard);
          })
          .catch((errorMessage) => {
            this.actions.registerForCourseFailed(errorMessage);
          });
      })
      .catch((errorMessage) => {
        this.actions.registerForCourseFailed(errorMessage);
      });
  }

  registerForCourseFailed(message) {
    this.dispatch(message);
  }
}

export default alt.createActions(WizardActions);
