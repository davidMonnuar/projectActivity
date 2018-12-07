const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src/main/javascript/'),
    entry: './main.js',
    output: {
        filename: 'app.librarydemo.js',
        path: path.resolve(__dirname, './src/main/resources/public/js')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};