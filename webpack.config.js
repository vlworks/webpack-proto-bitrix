const path = require('path')


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "bundle.styles.css",
        }),
        new BrowserSyncPlugin({
            proxy: 'https://ce93401.tmweb.ru/',
            serveStatic: ['.'],
            files: [
                './dist/*',
                './**/*.php'
            ]
        })
    ],
    entry: {
        scripts: './src/scripts/main.ts',
    },
    output: {
        filename: 'bundle.scripts.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        }
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
