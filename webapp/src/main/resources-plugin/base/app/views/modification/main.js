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
  return ['ViewsProvider', function (ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.processInstance.runtime.tab', {
      id: 'modification-process-instances',

      label: 'Modify',

      template: template,

      controller: [function() {
      }],

      priority: 20
    });
  }];
});
