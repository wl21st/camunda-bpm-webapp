module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  var pkg = require('./package.json');
  var protractorConfig = grunt.option('protractorConfig') || 'src/test/js/e2e/ci.conf.js';

  var config = pkg.gruntConfig || {};

  config.grunt = grunt;
  config.pkg = pkg;
  config.protractorConfig = protractorConfig;

  var requireJsConf = {
    options: {
      optimize: '<%= (buildTarget === "dist" ? "uglify2" : "none") %>',
    }
  };

  require('./grunt/config/requirejs')(config, requireJsConf);
  require('camunda-admin-ui/grunt/config/requirejs')(config, requireJsConf);

  var copyConf = { };
  require('camunda-admin-ui/grunt/config/copy')(config, copyConf);

  var lessConf = { };
  require('camunda-admin-ui/node_modules/camunda-commons-ui/grunt/config/less')(config, lessConf, {
    appName: 'admin',
    sourceDir: pkg.gruntConfig.adminSourceDir,
    buildTarget: pkg.gruntConfig.adminBuildTarget,
  });

  grunt.initConfig({
    pkg:              pkg,

    requirejs:        requireJsConf,

    copy:             copyConf,

    less:             lessConf,

    clean:            require('./grunt/config/clean')(config),

    watch:            require('./grunt/config/watch')(config),

    protractor:       require('./grunt/config/protractor')(config)
  });

  grunt.registerTask('build', function(mode) {

    grunt.config.data.buildTarget = mode || 'prod';

    grunt.task.run([
      'clean',
      'requirejs',
      'copy',
      'less'
    ]);

  });



  grunt.registerTask('auto-build', [
    'build:dev',
    'watch'
  ]);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('test-e2e', ['build', 'protractor:e2e']);
};
