var webpack = require('webpack');
var MemoryFS = require('memory-fs');
var vm = require('vm');

var target = process.argv[2]; // first argument

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
    } else if (stats.errors) {
        console.error(stats.errors);
    } else {
        if (stats.warnings) {
            console.warn(stats.warnings);
        }
        var scriptSrc = fs.readFileSync('/script.js', 'utf-8');
        var script = new vm.Script(scriptSrc);
        script.runInNewContext();
    }
});
