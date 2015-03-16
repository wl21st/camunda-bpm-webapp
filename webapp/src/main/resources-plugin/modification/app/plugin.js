define(['angular', './views/main'],
function(angular, viewsModule) {
  return angular.module('cockpit.plugin.modification', [viewsModule.name]);
});
