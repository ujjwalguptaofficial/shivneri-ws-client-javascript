const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');

const libraryTarget = [{
    type: "var",
    name: `shivneri-ws-client.min.js`
},
    // {
    //     type: "commonjs2",
    //     name: `shivneri-ws-client.commonjs2.js`
    // }
];

function getConfigForTaget(target) {
    return {
        mode: "production",
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "../build"),
            filename: target.name,
            library: `${baseConfig.name}`,
            libraryTarget: target.type
        }
    }
}

function createConfigsForAllLibraryTarget() {
    var configs = [];
    libraryTarget.forEach(function (target) {
        configs.push(merge(baseConfig, getConfigForTaget(target)));
    })
    return configs;
}

module.exports = [...createConfigsForAllLibraryTarget()]