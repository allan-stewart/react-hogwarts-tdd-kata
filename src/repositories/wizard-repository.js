let wizard = {
  house: '',
  courses: []
};

export default class WizardRepository {

  static get() {
    return wizard;
  }

  static save(updatedWizard) {
    wizard = updatedWizard;
    return wizard;
  }

}
