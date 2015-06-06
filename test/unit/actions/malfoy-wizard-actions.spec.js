import should from 'should';
import sinon from 'sinon';

import alt from "../../../src/alt";
import wizardActions from '../../../src/actions/malfoy-wizard-actions';
import WizardRepository from '../../../src/repositories/wizard-repository';

var mockWizardRepository;

describe('wizard actions', () => {

  var dispatchedEvents;

  before(() => {
    alt.dispatcher.register((event) => {
      if (event.details.namespace == 'WizardActions') {
        dispatchedEvents.push(event);
      }
    });
  });

  beforeEach(() => {
    dispatchedEvents = [];
    mockWizardRepository = sinon.mock(WizardRepository);
  });

  describe('getWizard', () => {

    it('invokes updateWizard on success', (done) => {
      var wizard = {house: 'Slytherin', courses: []};
      mockWizardRepository.expects('get').once()
        .returns(new Promise((resolve) => { resolve(wizard); }));

      wizardActions.getWizard();

      setTimeout(() => {
        should(dispatchedEvents.length).equal(1);
        should(dispatchedEvents[0].details.name).equal('updateWizard');
        should(dispatchedEvents[0].data).equal(wizard);

        mockWizardRepository.verify();
        done();
      }, 10);
    });

    it('invokes updateWizardFailed on error', (done) => {
      var errorMessage = 'Test error message.';
      mockWizardRepository.expects('get').once()
        .returns(new Promise((resolve, reject) => { reject(errorMessage); }));

      wizardActions.getWizard();

      setTimeout((event) => {
        should(dispatchedEvents.length).equal(1);
        should(dispatchedEvents[0].details.name).equal('updateWizardFailed');
        should(dispatchedEvents[0].data).equal(errorMessage);

        mockWizardRepository.verify();
        done();
      }, 10);
    });

  });

  describe('registerForCourse', () => {

    it('invokes updateWizard on success', (done) => {
      let course = {
        id: "DDA302-13",
        name: "Defence Against the Dark Arts",
        professor: "Quirinus Quirrell",
        credits: 3,
        startTime: new Date(0, 0, 0, 11, 30),
      };
      var wizard = {house: 'Slytherin', courses: []};

      mockWizardRepository.expects('get').once()
        .returns(new Promise((resolve) => { resolve(wizard); }));
      mockWizardRepository.expects('save').once()
        .returns(new Promise((resolve) => { resolve(wizard); }));

      wizardActions.registerForCourse(course);

      setTimeout(() => {
        should(dispatchedEvents.length).equal(1);
        should(dispatchedEvents[0].details.name).equal('updateWizard');
        should(dispatchedEvents[0].data.house).equal(wizard.house);
        should(dispatchedEvents[0].data.courses.length).equal(1);
        should(dispatchedEvents[0].data.courses[0]).equal(course);

        mockWizardRepository.verify();
        done();
      }, 10);
    });

  });

});
