/* global define: false */

/**
 * @namespace cam.cockpit.plugin.modification.views
 */
'use strict';
define([
  'angular',
  'camunda-bpm-sdk-js',
  'text!./modification.html',
  'text!./modification-confirmation-dialog.html'
], function(
  angular,
  CamSDK,
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
    'Uri',
  function(
    $scope,
    $modal,
    Uri
  ) {
    var instanceData = $scope.processData.newChild($scope);

    var client = new CamSDK.Client({
      apiUri: Uri.appUri('engine://'),
      engine: Uri.appUri(':engine')
    });

    var variableService = client.resource('variable');
    var processInstanceService = client.resource('process-instance');


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
        instances[id] = false;
      });

      var countInst = activityInstanceIds.length;

      $scope.instructions.push({
        operation:    countInst >= 1 ? 'cancel' : 'startBefore',
        id:           activityId,
        instanceIds:  activityInstanceIds,
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

    $scope.instructionSelectedInstancesCount = function (instruction) {
      var c = 0;
      for (var inst in instruction.instances) {
        if (instruction.instances[inst]) {
          c++;
        }
      }
      if (c === 0) {
        return Object.keys(instruction.instances).length;
      }
      return c;
    };

    $scope.instructionAddInstance = function (instructionIndex) {
      var input = angular.element('[list="activity-' + instructionIndex + '-instances"]');
      var instanceId = input.val();
      if (!instanceId) { return; }
      $scope.instructions[instructionIndex].instances[instanceId] = true;
      input.val('');
    };

    $scope.instructionSelectAllInstances = function (instructionIndex) {
      for (var id in $scope.instructions[instructionIndex].instances) {
        // probably not needed in some clean code
        if (!id) {
          delete $scope.instructions[instructionIndex].instances[id];
        }
        $scope.instructions[instructionIndex].instances[id] = false;
      }
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
      console.info('removeInstructionVariable', instructionIndex, index);
      var items = $scope.instructions[instructionIndex].variables;
      items = items.slice(0, index).concat(items.slice(index + 1));
      $scope.instructions[instructionIndex].variables = items;
    };

    // see http://stage.docs.camunda.org/api-references/rest/#process-instance-modify-process-instance-execution-state
    $scope.requestPayload = {
      skipCustomListeners:  true,
      skipIoMappings:       true,
      instructions:         []
    };

    function serializeInstructions() {
      $scope.requestPayload.instructions = [];

      $scope.instructions.forEach(function (instruction) {
        switch (instruction.operation) {
          case 'cancel':
            if ($scope.instructionSelectedInstancesCount(instruction) === instruction.instanceIds.length) {
              $scope.requestPayload.instructions.push({
                type: 'cancel',
                activityId: instruction.id
              });
            }
            else {
              Object.keys(instruction.instances).forEach(function (instanceId) {
                if (!instruction.instances[instanceId]) { return; }
                $scope.requestPayload.instructions.push({
                  type: 'cancel',
                  activityInstanceId: instanceId
                });
              });
            }
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
          },
          processInstanceService: function () {
            return processInstanceService;
          }
        }
      });

      modalInstance.result.then(function (requestPayload) {
        var send = angular.copy(requestPayload);
        // send.id = '';
        console.info('confirmed payload', send);

        processInstanceService.modify(send, function (err) {
          if (err) { throw err; }
          $scope.instructions = [];
        });
      },
      function (reason) {
        console.info('reason', reason);
      });
    };

    instanceData.observe([
      'processInstance', 'filter', 'activityIdToInstancesMap', 'bpmnElements',
    ], function(
      processInstance, filter, activityIdToInstancesMap, bpmnElements
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
