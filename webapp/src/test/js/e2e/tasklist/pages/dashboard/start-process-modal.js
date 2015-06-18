'use strict';

var Page = require('./dashboard-view');

module.exports = Page.extend({

  startProcessDialog: function () {
    return element(by.css('.modal .modal-content'));
  },

  openStartDialog: function() {
    var elementToWaitFor = this.searchProcessInput();

    this.selectNavbarItem('Process');
    this.waitForElementToBeVisible(elementToWaitFor, 5000);
  },

  openStartDialogAndSelectProcess: function(processName) {
    this.openStartDialog();

    var elementToWaitFor = element(by.css('[ng-click="selectProcessDefinition(processDefinition)"]'));
    this.waitForElementToBeVisible(elementToWaitFor, 5000);

    if (arguments.length === 1 && typeof processName === 'number') {
      this.selectProcessByIndex(processName);
    } else {
      this.selectProcessByName(processName);
    }
  },

  closeButton: function() {
    return this.startProcessDialog()
      .element(by.css('[ng-click="$dismiss()"]'));
  },

  closeStartDialog: function() {
    var closeButtonElement = this.closeButton();
    closeButtonElement.click();
    this.waitForElementToBeNotPresent(closeButtonElement, 5000);
  },

  startButton: function() {
    return this.startProcessDialog()
      .element(by.css('[ng-click="startProcessInstance()"]'));
  },

  startProcess: function() {
    var startButtonElement = this.startButton();
    startButtonElement.click();
    this.waitForElementToBeNotPresent(startButtonElement, 5000);
  },

  backButton: function() {
    return this.startProcessDialog()
      .element(by.css('.modal-footer [ng-click="showList())"]'));
  },

  searchProcessInput: function(inputValue) {
    var inputField = element(by.css('.modal-header input'));

    if (arguments.length !== 0)
      inputField.sendKeys(inputValue);

    return inputField;
  },

  processList: function() {
    return element.all(by.repeater('processDefinition in processDefinitions'));
  },

  selectProcessByIndex: function(idx) {
    var elementToWaitFor = this.businessKeyInput();

    return this.processList().get(idx).element(by.css('[ng-click="selectProcessDefinition(processDefinition)"]')).click();
    this.waitForElementToBeVisible(elementToWaitFor, 5000);
  },

  selectProcessByName: function(name) {
    var that = this;

    this.findElementIndexInRepeater('processDefinition in processDefinitions', by.css('[class="ng-binding"]'), name)
        .then(function(idx) {
          that.selectProcessByIndex(idx);
        });
  },

  businessKeyInput: function(inputValue) {
    var inputField = element(by.css('[cam-business-key]'));

    if (arguments.length !== 0)
      inputField.sendKeys(inputValue);

    return inputField;
  },

  genericFormAddVariableButton: function() {
    return element(by.css('[ng-click="addVariable()"]'));
  },

  genericFormRemoveVariableButton: function(idx) {
    return this.criterionList().get(idx).element(by.css('[ng-click="removeCriterion(delta)"]'));
  },

  genericFormVariableNameInput: function(idx, inputValue) {
    var inputField = this.variableList().get(idx)
      .element(by.css('[ng-model="variable.name"]'));

    if (arguments.length !== 0)
      inputField.sendKeys(inputValue);

    return inputField;
  },

  genericFormVariableTypeInput: function(idx, inputValue) {
    var inputField = this.variableList().get(idx)
      .element(by.css('[ng-model="variable.type"]'));

    if (arguments.length !== 0)
      inputField.element(by.cssContainingText('option', inputValue)).click();

    return inputField;
  },

  genericFormVariableValueInput: function(idx, inputValue) {
    var inputField = this.variableList().get(idx)
      .element(by.css('[ng-model="variable.value"]'));

    if (arguments.length !== 0)
      inputField.sendKeys(inputValue);

    return inputField;
  },

  removeVariable: function(idx) {
    this.removeVariableButton().click();
  },

  variableList: function() {
    return this.startProcessDialog().all(by.repeater('(delta, variable) in variables'));
  },

});
