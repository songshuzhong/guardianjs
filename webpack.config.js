const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './index.ts',
    output: {
        filename: 'guardian.[hash:6].js',
        libraryTarget: 'window'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        strictExportPresence: false,
        rules: [
            {
                test: /\.(ts)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            configFile: false,
                            presets: [
                                ['@babel/env', {
                                    modules: 'commonjs'
                                }]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            allowTsInNodeModules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['output'])
    ],
};