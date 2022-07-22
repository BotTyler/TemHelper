const
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyPlugin = require("copy-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    OverwolfPlugin = require('./overwolf.webpack');

module.exports = env => ({
    entry: {
        background: './src/background/background.ts',
        desktop: './src/desktop/desktop.ts',
        in_game: './src/in_game/in_game.ts',
        damageCalculator: './src/in_game/damageCalculator.ts',
        breedingCalc: './src/in_game/breedingCalc.ts',
        freeTem: './src/in_game/freeTem.ts',
        teamCreator: './src/in_game/teamCreator.ts',
        TemTemSelector: './src/in_game/TemTemSelector.ts',

    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'js/[name].js'
    },
    plugins: [
        new CleanWebpackPlugin,
        new CopyPlugin({
            patterns: [ { from: "public", to: "./" } ],
        }),
        new HtmlWebpackPlugin({
            template: './src/background/background.html',
            filename: path.resolve(__dirname, './dist/background.html'),
            chunks: ['background']
        }),
        new HtmlWebpackPlugin({
            template: './src/desktop/desktop.html',
            filename: path.resolve(__dirname, './dist/desktop.html'),
            chunks: ['desktop']
        }),
        new HtmlWebpackPlugin({
            template: './src/in_game/in_game.html',
            filename: path.resolve(__dirname, './dist/in_game.html'),
            chunks: ['in_game']
        }),
        new HtmlWebpackPlugin({
            template: './src/in_game/damageCalculator.html',
            filename: path.resolve(__dirname, './dist/damageCalculator.html'),
            chunks: ['damageCalculator']
        }),
        new HtmlWebpackPlugin({
            template: './src/in_game/freeTem.html',
            filename: path.resolve(__dirname, './dist/freeTem.html'),
            chunks: ['freeTem']
        }),
        new HtmlWebpackPlugin({
            template: './src/in_game/breedingCalc.html',
            filename: path.resolve(__dirname, './dist/breedingCalc.html'),
            chunks: ['breedingCalc']
        }),
        new HtmlWebpackPlugin({
            template: './src/in_game/teamCreator.html',
            filename: path.resolve(__dirname, './dist/teamCreator.html'),
            chunks: ['teamCreator']
        }),        
        new HtmlWebpackPlugin({
            template: './src/in_game/TemTemSelector.html',
            filename: path.resolve(__dirname, './dist/TemTemSelector.html'),
            chunks: ['TemTemSelector']
        }),
        new OverwolfPlugin(env)
    ]
})
