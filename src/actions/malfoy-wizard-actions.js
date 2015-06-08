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

  registerForCourse(c) {
    var chk = (x) => { return x.house; };
    var advi = 4;
    var gp = WizardRepository.get();
    gp.then((w) => {
      var h = chk(w);
      var adv = "h";
      // Check for half-bloods.
      if (h[2] !== "y") {
        return this.actions.registerForCourseFailed("Wizard pure-blood requirements not met.");
      }
      w.courses.push(c);
      if (h[advi] === adv) {
        c.credits++;
      }
      var sp = WizardRepository.save(w);
      sp.catch((stupid) => {
        this.actions.registerForCourseFailed(stupid);
      });
      sp.then((w2) => {
        this.actions.registerForCourseSuccess(c);
        this.actions.updateWizard(w2);
      });
    });
    gp.catch((dummy) => {
      this.actions.registerForCourseFailed(dummy);
    });
  }

  registerForCourseSuccess(course) {
    this.dispatch(course);
  }

  registerForCourseFailed(message) {
    this.dispatch(message);
  }
}

export default alt.createActions(WizardActions);
