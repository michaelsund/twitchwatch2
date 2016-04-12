module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-electron-installer')
  grunt.initConfig({
    'create-windows-installer': {
      x64: {
        appDirectory: '/builds/TwitchWatch2-win32-x64',
        outputDirectory: '/release',
        authors: 'Michael Sund michael@osund.com',
        exe: 'TwitchWatch2.exe'
      }
    }
  });
  grunt.registerTask('win64installer', ['create-windows-installer']);
};
