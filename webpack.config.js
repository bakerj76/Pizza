module.exports = {
    entry: {
        pizza: [
            'webpack-dev-server/client?http://localhost:8080',
            './js/index.js'
        ]
    },

    output: {
        filename: 'public/[name].js'
    },

    resolve: {
        modulesDirectories: ['node_modules', 'js', 'data'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /.json$/,
                loader: 'json'
            }
        ]
    }
};
