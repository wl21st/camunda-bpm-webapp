'use strict';

var fs = require('fs');

var ops = module.exports = {};

ops.deployment = {
  create: [{
    deploymentName:  'user-tasks',
    files:           [{
      name: 'user-tasks.bpmn',
      content: fs.readFileSync(__dirname + '/../../resources/user-tasks.bpmn').toString()
    }]
  }]
};
