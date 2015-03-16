define([
  'angular'
],
function(
  angular
) {
  'use strict';
  var $ = angular.element;

  return ['ViewsProvider', function PluginConfiguration(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.processInstance.runtime.tab', {
      id: 'modification-process-instances',

      label: 'Modify Process Instances',

      url: $('base').attr('cockpit-api') + 'plugin/modification/static/app/modification.html',

      controller: [function() {
        console.info('Pull Up!');
      }],

      priority: 20
    });
  }];
});
