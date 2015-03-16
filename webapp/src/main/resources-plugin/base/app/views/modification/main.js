/* global define: false */

/**
 * @namespace cam.cockpit.plugin.modification.views
 */
'use strict';
define([
  'angular',
  'text!./modification.html'
], function(
  angular,
  template
) {
  var ngModule = angular.module('cockpit.plugin.modification.views', []);

  console.info('modification plugin initialization');

  var Configuration = function PluginConfiguration(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.processInstance.runtime.tab', {
      id: 'modification-process-instances',

      label: 'Modify Process Instances',

      template: template,
      // url: $('base').attr('cockpit-api') + 'plugin/modification/static/app/modification.html',

      controller: [function() {
        console.info('Pull Up!');
      }],

      priority: 20
    });
  };

  Configuration.$inject = ['ViewsProvider'];

  ngModule.config(Configuration);

  return ngModule;
});
