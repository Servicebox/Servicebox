// webpack.config.js
module.exports = {
    entry: './client.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'client-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};