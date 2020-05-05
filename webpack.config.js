const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: './js/[name].[chunkhash].js',
    },
    devServer: {
        compress: true,
        port: 9000
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/i,
                use: [
                  'file-loader?name=./images/[name].[ext]',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true,
                      disable: false
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
       new WebpackMd5Hash()
    ]
}
