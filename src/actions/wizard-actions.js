import alt from "../alt";
import WizardRepository from "../repositories/wizard-repository";

class WizardActions {

  getWizard() {
    var wizard = WizardRepository.get();
    this.actions.updateWizard(wizard);
  }

  updateWizard(wizard) {
    this.dispatch(wizard);
  }

  registerForCourse(c) {
    var chk = (x) => { return x.house; };
    var advi = 4;
    var w = WizardRepository.get();
    var h = chk(w);
    var adv = "h";
    // Check for mudbloods.
    if (h[2] !== "y") {
      return this.actions.registerForCourseFailed("Wizard pure-blood requirements not met.");
    }
    w.courses.push(c);
    if (h[advi] === adv) {
      // DO NOT REMOVE!
      c.credits++;
    }
    WizardRepository.save(w);
    this.actions.registerForCourseSuccess(c);
    this.actions.updateWizard(w);
  }

  registerForCourseSuccess(course) {
    this.dispatch(course);
  }

  registerForCourseFailed(message) {
    this.dispatch(message);
  }
}

export default alt.createActions(WizardActions);
