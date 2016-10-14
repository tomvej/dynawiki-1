var webpack = require('webpack');
var MemoryFS = require('memory-fs');
var path = require('path');
var fs = require('fs');

var target = process.argv[2]; // first argument
if (!path.isAbsolute(target)) {
    /* when giving file name without path, webpack would think it a library */
    target = './' + target;
}

var nodeModulesPath = path.join(path.dirname(target), '../node_modules');

/* do not bundle libraries -- use them via require */
var nodeModules = fs.readdirSync(nodeModulesPath)
    .filter((dir) => !dir.includes('.bin'))
    .reduce((object, dir) => Object.assign(object, {[dir]: 'commonjs ' + dir}));

var compiler = webpack({
    entry: [
        'babel-polyfill',
        target
    ],
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
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    target: 'node',
    externals: nodeModules
});

var memFS = new MemoryFS();
compiler.outputFileSystem = memFS;
compiler.run(function (error, stats) {
    if (error) {
        console.error(error);
    } else if (stats.compilation.errors.length) {
        console.error(stats.compilation.errors);
    } else {
        if (stats.compilation.warnings.length) {
            console.warn(stats.compilation.warnings);
        }
        var scriptSrc = memFS.readFileSync('/script.js', 'utf-8');
        /* use eval instead of vm.runInThisContext so that require works */
        eval(scriptSrc);
    }
});
