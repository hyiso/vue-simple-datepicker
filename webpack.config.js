module.exports = {
    entry: './test/test.js',
    output: {
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },{
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'
        }]
    },
    babel: {
        presets: ['es2015']
    },
    devtool: '#source-map'
}