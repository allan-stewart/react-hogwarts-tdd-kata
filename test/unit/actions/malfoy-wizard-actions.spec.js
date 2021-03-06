import { expect } from 'chai';
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
        expect(dispatchedEvents.length).equal(1);
        expect(dispatchedEvents[0].details.name).equal('updateWizard');
        expect(dispatchedEvents[0].data).equal(wizard);

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
        expect(dispatchedEvents.length).equal(1);
        expect(dispatchedEvents[0].details.name).equal('updateWizardFailed');
        expect(dispatchedEvents[0].data).equal(errorMessage);

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
        expect(dispatchedEvents.length).equal(2);
        expect(dispatchedEvents[0].details.name).equal('registerForCourseSuccess');
        expect(dispatchedEvents[0].data).equal(course);
        expect(dispatchedEvents[1].details.name).equal('updateWizard');
        expect(dispatchedEvents[1].data.house).equal(wizard.house);
        expect(dispatchedEvents[1].data.courses.length).equal(1);
        expect(dispatchedEvents[1].data.courses[0]).equal(course);

        mockWizardRepository.verify();
        done();
      }, 10);
    });

  });

});
