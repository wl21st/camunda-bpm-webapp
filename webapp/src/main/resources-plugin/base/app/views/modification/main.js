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
  var $ = angular.element;

  var ViewController = [
    '$scope',
  function(
    $scope
  ) {
    var instanceData = $scope.processData.newChild($scope);

    $scope.instructions = [];
    $scope.selectionMode = false;

    $scope.switchSelectionMode = function () {
      $scope.selectionMode = !$scope.selectionMode;
    };

    $scope.addInstruction = function (activityId, allInstanceIds) {
      $scope.instructions.push({
        operation: 'cancel',
        activityId: activityId,
        allInstanceIds: allInstanceIds,
        activityInstanceIds: allInstanceIds.map(function (inst) {
          return inst.id ? inst.id : inst;
        }),
        target: null,
        variables: []
      });
    };

    $scope.removeInstruction = function (index) {
      var instructions = [];

      $scope.instructions.forEach(function (instruction, i) {
        if (index !== i) {
          instructions.push(instruction);
        }
      });

      $scope.instructions = instructions;
    };

    $scope.changeInstructionOperation = function ($event, $index) {
      $scope.instructions[$index].operation = $($event.target).val();
    };

    $scope.toggleInstanceSelections = function (instructionIndex, instanceIndex) {
      // console.info('toggleInstanceSelections', instructionIndex, instanceIndex);
    };

    $scope.instructionHasInstance = function (instruction, instanceId) {
      var ids = instruction.allInstanceIds.map(function (inst) {
        return inst.id;
      });
      return ids.indexOf(instanceId) > -1;
    };


    $scope.operationHasVariables = function (op) {
      return ['startBefore', 'startAfter', 'move'].indexOf(op) > -1;
    };

    $scope.operationHasTarget = function (op) {
      return ['startBefore', 'startAfter', 'move'].indexOf(op) > -1;
    };


    var previousActivityId;
    instanceData.observe([
      'filter', 'activityIdToInstancesMap', 'bpmnElements',
    ], function(
      filter, activityIdToInstancesMap, bpmnElements
    ) {
      var currentActivityId = filter.activityIds[0];
      $scope.bpmnElements = bpmnElements;

      if (currentActivityId) {
        if ($scope.selectionMode && previousActivityId !== currentActivityId) {
          $scope.selectionMode = false;
          $scope.addInstruction(currentActivityId, activityIdToInstancesMap[currentActivityId]);

          previousActivityId = currentActivityId;
        }
      }
    });
  }];

  return ['ViewsProvider', function (ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.processInstance.runtime.tab', {
      id: 'modification-process-instances',

      label: 'Modify',

      template: template,

      controller: ViewController,

      priority: 20
    });
  }];
});
