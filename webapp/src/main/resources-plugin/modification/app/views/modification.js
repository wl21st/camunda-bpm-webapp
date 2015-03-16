define([
  'angular',
  'text!./modification.html'
],
function(
  angular,
  template
) {
  'use strict';
  // var $ = angular.element;
  console.info('modification plugin loaded');

  return function (ngModule) {
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
  };
});
