'use strict';

var testHelper = require('../../test-helper');
var setupFile = require('./filter-criteria-setup');

var dashboardPage = require('../pages/dashboard');
var editModalPage = dashboardPage.taskFilters.editFilterPage;


describe('Tasklist Filter Criteria Spec', function() {

  describe.only('add new criteria', function() {

    before(function() {
      return testHelper(setupFile, function() {

        dashboardPage.navigateToWebapp('Tasklist');
        dashboardPage.authentication.userLogin('admin', 'admin');
      });
    });


    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });


    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });

    it('schould open edit filter modal', function() {

      // given
      dashboardPage.taskFilters.selectFilter(2);

      // when
      dashboardPage.taskFilters.editFilter(2);

      // then
      expect(element(by.css('.modal-content')).isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader().isDisplayed()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.formHeader()).to.eventually.eql('Edit filter');
      expect(dashboardPage.taskFilters.editFilterPage.saveButton().isEnabled()).to.eventually.be.true;
      expect(dashboardPage.taskFilters.editFilterPage.closeButton().isPresent()).to.eventually.be.true;
    });

    it('should close edit filter modal', function() {

      // when
      dashboardPage.taskFilters.editFilterPage.saveFilter();

      // then
      expect(dashboardPage.taskFilters.editFilterPage.formElement().isPresent()).to.eventually.be.false;
    });
  });

});
