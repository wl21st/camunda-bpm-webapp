define(['angular',
  './modification'
], function(angular,
  modification) {
  'use strict';

  var ngModule = angular.module('cockpit.plugin.modification.views', []);

  ngModule.config(modification);

  return ngModule;

});
