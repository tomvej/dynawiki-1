var webpack = require('webpack');
var MemoryFS = require('memory-fs');
var vm = require('vm');
var path = require('path');

var target = process.argv[2]; // first argument
if (!path.isAbsolute(target)) {
    /* when giving file name without path, webpack would think it a library */
    target = './' + target;
}

var compiler = webpack({
    entry: target,
    output: {
        path: '/',
        filename: 'script.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    target: 'node'
});

var fs = new MemoryFS();
compiler.outputFileSystem = fs;
compiler.run(function (error, stats) {
    if (error) {
        console.error(error);
    } else if (stats.compilation.errors.length) {
        console.error(stats.compilation.errors);
    } else {
        if (stats.compilation.warnings.length) {
            console.warn(stats.compilation.warnings);
        }
        var scriptSrc = fs.readFileSync('/script.js', 'utf-8');
        var script = new vm.Script(scriptSrc);
        script.runInThisContext();
    }
});
