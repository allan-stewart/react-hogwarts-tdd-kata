var wizard = {
  house: "",
  courses: []
};

export default class WizardRepository {

  static get() {
    return new Promise(function (resolve /*, reject*/) {
      setTimeout(function () {
        resolve(wizard);
      }, 250);
    });
  }

  static save(updatedWizard) {
    return new Promise(function (resolve /*, reject*/) {
      setTimeout(function () {
        wizard = updatedWizard;
        resolve(wizard);
      });
    });
  }

}
