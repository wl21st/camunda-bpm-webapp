'use strict';

var AuthorizationsPage = require('./authorizations-base');
var ApplicationPage = require('./application');
var AuthorizationPage = require('./authorization');
var DeploymentPage = require('./deployment');
var FilterPage = require('./filter');
var GroupPage = require('./group');
var GroupMembershipPage = require('./group-membership');
var ProcessDefinitionPage = require('./process-definition');
var ProcessInstancePage = require('./process-instance');
var TaskPage = require('./task');
var UserPage = require('./user');
var AuthenticationPage = require('../../../commons/pages/authentication');

module.exports = new AuthorizationsPage();
module.exports.application = new ApplicationPage();
module.exports.authorization = new AuthorizationPage();
module.exports.deployment = new DeploymentPage();
module.exports.filter = new FilterPage();
module.exports.group = new GroupPage();
module.exports.groupMembership = new GroupMembershipPage();
module.exports.processDefinition = new ProcessDefinitionPage();
module.exports.processInstance = new ProcessInstancePage();
module.exports.task = new TaskPage();
module.exports.user= new UserPage();
module.exports.authentication = new AuthenticationPage();

