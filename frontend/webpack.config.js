const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ mode } = { mode: 'production' }) => {
    console.log(`mode is: ${mode}`)

    return {
        mode,
        performance: {
            hints: false 
        }, 
        devServer: {
            compress: false,
            historyApiFallback: true,
            port: 3000,
        },
        devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
        entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.tsx'],
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'build'),
            filename: 'bundled.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$|ts$|jsx|tsx/,
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        'less-loader',
                    ],
                },
                {
                    test: /\.(ico)$/,
                    use: ['file-loader?name=[name].[ext]'],
                },
                {
                    test: /\.png$/,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                    type: 'javascript/auto',
                    issuer: {
                        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                    },
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                        },
                        {
                            loader: 'file-loader',
                        },
                    ],
                    type: 'javascript/auto',
                    issuer: {
                        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                favicon: './public/favicon.ico',
                template: './public/index.html',
            }),
        ],
    }
}
