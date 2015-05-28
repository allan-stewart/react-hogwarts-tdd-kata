import alt from "../alt";
import WizardRepository from "../repositories/wizard-repository";

class WizardActions {

  getRegisteredCourses() {
    this.dispatch();

    WizardRepository.getRegisteredCourses()
      .then((registeredCourses) => {
        this.actions.updateRegisteredCourses(registeredCourses);
      })
      .catch((errorMessage) => {
        this.actions.updateRegisteredCoursesFailed(errorMessage);
      });
  }

  updateRegisteredCourses(registeredCourses) {
    this.dispatch(registeredCourses);
  }

  updateRegisteredCoursesFailed(message) {
    console.log("Failed to update registered courses: " + message);
    throw message;
  }
}

export default alt.createActions(WizardActions);
