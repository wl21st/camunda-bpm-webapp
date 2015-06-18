/* jshint node: true, unused: false */
/* global __dirname: false, describe: false, beforeEach: false, before:false, it: false, browser: false,
          element: false, expect: false, by: false, protractor: false, driver: false, until: false */
'use strict';

var testHelper = require('../../test-helper');
var setupFile = require('./process-start-setup');

var dashboardPage = require('../pages/dashboard');
var startDialogPage = dashboardPage.startProcess;

describe.only('Tasklist Start Spec', function () {

  before(function() {
    return testHelper(setupFile, function() {

      dashboardPage.navigateToWebapp('Tasklist');
      dashboardPage.authentication.userLogin('admin', 'admin');
    });
  });


  describe('start process dialog', function() {

    afterEach(function() {
      startDialogPage.closeStartDialog();
    });

    it('should open', function() {

      // when
      dashboardPage.startProcess.openStartDialog();

      // then
      expect(startDialogPage.searchProcessInput().isDisplayed()).to.eventually.be.true;
    });


    it('should provide a list of processes that can be selected', function() {

      // when
      startDialogPage.openStartDialogAndSelectProcess(0);

      // then
      expect(startDialogPage.startButton().isEnabled()).to.eventually.be.true;
    });

  });


  describe('process with generic start form', function() {

    beforeEach(function() {
      startDialogPage.openStartDialogAndSelectProcess(0);
    });

    afterEach(function() {
      startDialogPage.closeStartDialog();
    });

    it('should disable start button when adding variable', function() {

      // given
      expect(startDialogPage.genericFormAddVariableButton().isDisplayed()).is.eventually.be.true;

      // when
      startDialogPage.genericFormAddVariableButton().click()

      // then
      expect(startDialogPage.startButton().isEnabled()).to.eventually.be.false;
    });


    it('should enable start button after adding variable information is complete', function() {

      // given
      expect(startDialogPage.genericFormAddVariableButton().isDisplayed()).is.eventually.be.true;

      // when
      startDialogPage.genericFormAddVariableButton().click();
      startDialogPage.genericFormVariableNameInput(0, 'hans');
      startDialogPage.genericFormVariableTypeInput(0, 'String');
      startDialogPage.genericFormVariableValueInput(0, 'asdf');

      // then
      expect(startDialogPage.startButton().isEnabled()).to.eventually.be.true;
    });


    it('should allow to add business key', function() {

      // given
      expect(startDialogPage.businessKeyInput().isDisplayed()).is.eventually.be.true;

      // when
      startDialogPage.businessKeyInput('MyBusinessKey');

      // then
      expect(startDialogPage.startButton().isEnabled()).to.eventually.be.true;
    });

  });

});

/*describe.skip('Tasklist Start task', function () {
  before(function() {
    return testHelper(setupFile);
  });


  describe('menu link', function () {
    before(function () {
      page.navigateToWebapp('Tasklist');
    });

    it('can be found in navigation', function () {

      // when
      page.authentication.userLogin('admin', 'admin');

      // then
      expect(page.startProcess.navigationLinkElement().isPresent())
        .to.eventually.eql(true);

      expect(page.startProcess.navigationLinkElement().isDisplayed())
        .to.eventually.eql(true);
    });
  });


  describe('process definitions list', function() {
    before(function () {
      page.navigateToWebapp('Tasklist');
    });


    it('opens', function () {
      // when
      page.startProcess.openStartProcessDialog();

      // then
      expect(page.startProcess.searchProcessInput().isPresent())
        .to.eventually.eql(true);
      expect(page.startProcess.searchProcessInput().isDisplayed())
        .to.eventually.eql(true);
    });
  });


  describe('form', function () {
    describe('generic', function () {
      before(function (done) {
        openDialogAndSelectProcess('processWithSubProcess', done);
      });


      it('has a field for business key', function () {
        expect(page.startProcess.businessKeyField().isDisplayed())
          .to.eventually.eql(true);
          browser.sleep(5000);
        page.startProcess.businessKeyField().sendKeys('bububu-businessKey');
      });


      it('can add variables', function () {
        expect(page.startProcess.genericFormAddVariableButton().isDisplayed())
          .to.eventually.eql(true);

        // when
        page.startProcess.genericFormAddVariableButton().click();

        // then
        expect(page.startProcess.genericFormRowsCount()).to.eventually.eql(1);

        expect(page.startProcess.startButton().getAttribute('disabled'))
          .to.eventually.eql('true');
      });


      it('can be submitted', function () {
        // when
        page.startProcess.genericFormRowNameField(0).sendKeys('YadaYada');
        page.startProcess.genericFormRowTypeFieldSelect(0, 'String');
        page.startProcess.genericFormRowValueField(0).sendKeys('YuduYudu');

        expect(page.startProcess.startButton().getAttribute('disabled'))
          .to.eventually.eql(null);
      });
    });


    xdescribe('embedded', function () {
      before(function (done) {
        openDialogAndSelectProcess('examples', done);
      });


      it('has a field for business key', function () {
        expect(page.startProcess.businessKeyField().isDisplayed())
          .to.eventually.eql(true);
      });


      it('can be submitted');
    });


    xdescribe('generated (is not yet supported)', function () {
      before(function (done) {
        openDialogAndSelectProcess('Generated', done);
      });


      it('has a field for business key', function () {
        expect(page.startProcess.businessKeyField().isDisplayed())
          .to.eventually.eql(true);
      });


      it('can be submitted');
    });
  });
});
*/
