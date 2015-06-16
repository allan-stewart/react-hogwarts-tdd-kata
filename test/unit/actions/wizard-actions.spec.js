import {expect} from 'chai';
import sinon from 'sinon';

import alt from '../../../src/alt';
import WizardActions from '../../../src/actions/wizard-actions';
import WizardRepository from '../../../src/repositories/wizard-repository';


describe('Wizard actions', () => {
  let mockWizardRepository;
  let dispatchedEvents;

  before(() => {
    alt.dispatcher.register((event) => {
      if (event.details.namespace === 'WizardActions') {
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
      const wizard = {house: 'Slytherin', courses: []};
      mockWizardRepository.expects('get').once().returns(wizard);

      WizardActions.getWizard();

      setTimeout(() => {
        expect(dispatchedEvents.length).equal(1);
        expect(dispatchedEvents[0].details.name).equal('updateWizard');
        expect(dispatchedEvents[0].data).equal(wizard);

        mockWizardRepository.verify();
        done();
      }, 10);
    });

  });

  describe('registerForCourse', () => {

    let course = {
      id: 'DDA302-13',
      name: 'Defence Against the Dark Arts',
      professor: 'Quirinus Quirrell',
      credits: 3,
      startTime: new Date(0, 0, 0, 11, 30),
    };

    it('invokes registerForCourseSuccess and updateWizard on success', () => {
      const wizard = {house: 'Slytherin', courses: []};
      mockWizardRepository.expects('get').once().returns(wizard);

      WizardActions.registerForCourse(course);

      expect(dispatchedEvents.length).equal(2);
      expect(dispatchedEvents[0].details.name).equal('registerForCourseSuccess');
      expect(dispatchedEvents[0].data).equal(course);
      expect(dispatchedEvents[1].details.name).equal('updateWizard');
      expect(dispatchedEvents[1].data.house).equal(wizard.house);
      expect(dispatchedEvents[1].data.courses.length).equal(1);
      expect(dispatchedEvents[1].data.courses[0]).equal(course);

      mockWizardRepository.verify();
    });

    it('invokes WizardRepository.save on success', () => {
      const wizard = {house: 'Slytherin', courses: []};
      mockWizardRepository.expects('get').once().returns(wizard);
      mockWizardRepository.expects('save').once();

      WizardActions.registerForCourse(course);

      mockWizardRepository.verify();
    });

  });

  describe('sortIntoHouse', () => {

    it('invokes WizardRepository.save', () => {
      mockWizardRepository.expects('get').once().returns({});
      mockWizardRepository.expects('save').once();

      WizardActions.sortIntoHouse();

      mockWizardRepository.verify();
    });

    it('doesn\'t set house if it is already set', () => {
      mockWizardRepository.expects('get').once().returns({ house: 'Slytherin' });
      mockWizardRepository.expects('save').never();

      WizardActions.sortIntoHouse();

      mockWizardRepository.verify();
    });

  });

});
