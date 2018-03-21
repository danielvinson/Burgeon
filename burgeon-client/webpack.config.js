const path = require('path');

var APP_DIR = path.join(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, '../burgeon-server/burgeon/static/js/');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ],
                include: APP_DIR,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                include: APP_DIR,
            }
        ],
    },
};
