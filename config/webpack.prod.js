const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'), // Adjust the path to your desired output directory
        publicPath: '/' // Change this if needed
    },
    // Other configuration specific to your application
};

module.exports = merge(commonConfig, prodConfig);
