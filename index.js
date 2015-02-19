'use strict';

module.exports = (function () {
    // Connected to globbing patterns
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    var assemble = require('assemble'),
    extname = require('gulp-extname'),

    // [fix] - Replace once the globbing pattern works
    helpers = 'templates/helpers/{,*/}helper-**.js',
    path = require('path'),
    glob = require('glob'),
    helperFiles = glob.sync(helpers),
    helpers = helperFiles.reduce(function (acc, fp) {
        return extend(acc, require(path.resolve(fp)));
    }, {});

    assemble.layouts('templates/layouts/**.hbs');
    assemble.helpers(helpers);
    assemble.partials('templates/partials/**.hbs');

    return {
        assemble: assemble,
        addTask: function () {
            console.log('adding task!');
        }
    }
});

