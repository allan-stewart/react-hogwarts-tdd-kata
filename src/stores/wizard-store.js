import alt from '../alt';

import wizardActions from '../actions/wizard-actions';
import WizardRepository from '../repositories/wizard-repository';

class WizardStore {

  constructor() {
    this.wizard = WizardRepository.get();
    this.registrationResponse = null;
    this.bindAction(wizardActions.updateWizard, this.handleUpdatedWizard);
    this.bindAction(wizardActions.registerForCourseSuccess, this.onRegisterForCourseSuccess);
    this.bindAction(wizardActions.registerForCourseFailed, this.onRegisterForCourseFailed);
    this.bindActions(wizardActions.sortIntoHouse, this.handleUpdatedWizard);
  }

  handleUpdatedWizard(wizard) {
    this.wizard = wizard;
  }

  onRegisterForCourseSuccess(course) {
    this.registrationResponse = {
      error: false,
      message: 'Successfully registered for course: ' + course.name
    };
  }

  onRegisterForCourseFailed(message) {
    this.registrationResponse = {
      error: true,
      message: message
    };
  }
}

export default alt.createStore(WizardStore);
