const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');

module.exports = {
    entry: path.resolve(srcPath, 'Player.tsx'),
    externals: ['boclips-player', 'react', 'react-dom'],
    output: {
        filename: 'index.js',
        path: distPath,
        publicPath: '/',
        module: false,
        libraryTarget: 'umd',
    },
    resolve: {
        fallback: {querystring: require.resolve('querystring-es3')},
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {javascriptEnabled: true},
                        },
                    },
                    'less-loader',
                    'style-loader',
                ],
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.svg$/i,
                exclude: /node_modules/,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            prettier: false,
                            svgo: false,
                            svgProps: {role: 'img'},
                        },
                    },
                ],
            },
            {
                test: /\.(vtt)$/i,
                loader: 'file-loader',
                options: {
                    name: '/[name].[ext]'
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
};
