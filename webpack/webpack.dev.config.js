const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');

const libraryTarget = [{
    type: "var",
    name: `shivneri-ws_client.js`
}, {
    type: "commonjs2",
    name: `shivneri-ws_client.commonjs2.js`
}];

function getConfigForTaget(target) {
    return {
        mode: "development",
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