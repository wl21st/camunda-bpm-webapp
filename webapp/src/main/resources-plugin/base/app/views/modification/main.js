/* global define: false */

/**
 * @namespace cam.cockpit.plugin.modification.views
 */
'use strict';
define([
  'angular',
  'text!./modification.html',
  'text!./modification-confirmation-dialog.html'
], function(
  angular,
  template,
  templateDialog
) {
  var $ = angular.element;






  var ConfirmationController = [
    '$scope',
    '$modalInstance',
    'requestPayload',
  function (
    $dialogScope,
    $modalInstance,
    requestPayload
  ) {
    $dialogScope.requestPayload = requestPayload;

    $dialogScope.instructionCssClass = function (type) {
      switch (type) {
        case 'startBeforeActivity':
          return 'startBefore';

        case 'startAfterActivity':
          return 'startAfter';

        default:
          return type;
      }
    };

    $dialogScope.removeConfirmationInstruction = function (index) {
      var items = $dialogScope.requestPayload.instructions;
      items = items.slice(0, index).concat(items.slice(index + 1));
      $dialogScope.requestPayload.instructions = items;
    };

    $dialogScope.ok = function () {
      $modalInstance.close(requestPayload);
    };

    $dialogScope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }];









  var ViewController = [
    '$scope',
    '$modal',
  function(
    $scope,
    $modal
  ) {
    var instanceData = $scope.processData.newChild($scope);

    $scope.instructions = [];

    $scope.variableTypes = [
      'String',
      'Boolean',
      'Short',
      'Integer',
      'Long',
      'Double',
      'Date'
    ];

    $scope.addInstruction = function (activityId, activityInstanceIds) {
      var instances = {};

      activityInstanceIds.forEach(function (id) {
        instances[id] = true;
      });

      var countInst = activityInstanceIds.length;

      $scope.instructions.push({
        operation:    countInst >= 1 ? 'cancelAll' : 'startBefore',
        // operation:    countInst > 1 ? 'cancelSome' : (countInst === 1 ? 'cancelAll' : 'startBefore'),
        id:           activityId,
        instances:    instances,
        variables:    [],
        bpmnElement:  $scope.bpmnElements[activityId]
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

    $scope.instructionInstancesCount = function (instances) {
      return Object.keys(instances).length;
    };

    $scope.instructionChangeOperation = function ($event, $index) {
      $scope.instructions[$index].operation = $($event.target).val();
    };


    $scope.instructionHasInstance = function (instruction, instanceId) {
      var ids = instruction.allInstanceIds.map(function (inst) {
        return inst.id;
      });
      return ids.indexOf(instanceId) > -1;
    };


    $scope.instructionHasVariables = function (instruction) {
      return ['startBefore', 'startAfter'].indexOf(instruction.operation) > -1;
    };


    $scope.instructionVariableValue = function (variable) {
      // console.info('variable value', variable);
      return 'TODO: $scope.instructionVariableValue()';
    };

    $scope.editInstructionVariableValue = function (instructionIndex, index) {
      var variable = $scope.instructions[instructionIndex].variables[index];
      console.info('TODO: $scope.editInstructionVariableValue()', variable);
    };

    $scope.addInstructionVariable = function (instructionIndex) {
      $scope.instructions[instructionIndex].variables.push({
        name: null,
        type: 'String',
        value: null
      });
    };

    $scope.complexVariableType = function (type) {
      return type === 'String';
    };

    $scope.removeInstructionVariable = function (instructionIndex, index) {
      var items = $scope.instructions[instructionIndex].variables;
      items = items.slice(0, index).concat(items.slice(index + 1));
    };

    $scope.requestPayload = {
      skipCustomListeners: true,
      skipIoMappings: true,
      instructions: []
    };

    function serializeInstructions() {
      $scope.requestPayload.instructions = [];

      $scope.instructions.forEach(function (instruction) {
        switch (instruction.operation) {
          case 'cancelAll':
            $scope.requestPayload.instructions.push({
              type: 'cancel',
              activityId: instruction.id
            });
            break;

          case 'cancelSome':
            Object.keys(instruction.instances).forEach(function (instanceId) {
              if (!instruction.instances[instanceId]) { return; }
              $scope.requestPayload.instructions.push({
                type: 'cancel',
                activityInstanceId: instanceId
              });
            });
            break;

          case 'startBefore':
          case 'startAfter':
            var variables = instruction.variables;

            $scope.requestPayload.instructions.push({
              type: {
                'startAfter':   'startAfterActivity',
                'startBefore':  'startBeforeActivity'
              }[instruction.operation],
              activityId: instruction.id,
              variables: variables
            });
            break;
        }
      });
    }

    $scope.$watch('instructions', serializeInstructions, true);


    $scope.confirmModification = function () {
      var modalInstance = $modal.open({
        template:     templateDialog,
        controller:   ConfirmationController,
        windowClass:  'modification-confirmation-dialog',
        size:         'lg',
        resolve: {
          requestPayload: function () {
            return $scope.requestPayload;
          }
        }
      });

      modalInstance.result.then(function (requestPayload) {
        var send = angular.copy(requestPayload);
        $scope.instructions = [];
        console.info('confirmed payload', send);
      },
      function () {

      });
    };

    instanceData.observe([
      'filter', 'activityIdToInstancesMap', 'bpmnElements',
    ], function(
      filter, activityIdToInstancesMap, bpmnElements
    ) {
      $scope.bpmnElements = bpmnElements;

      if (filter.activityIds.length > 1) {
        filter.activityIds.forEach(function (id) {
          $scope.addInstruction(id, filter.activityInstanceIds);
        });
      }
      else {
        $scope.addInstruction(filter.activityIds[0], filter.activityInstanceIds);
      }
    });
  }];

  return ['ViewsProvider', function (ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.processInstance.runtime.tab', {
      id:         'modification-process-instances',
      label:      'Modify',
      template:   template,
      controller: ViewController,
      priority:   20
    });
  }];
});
