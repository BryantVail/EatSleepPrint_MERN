module.exports = {
    entry:'./src/orders.jsx',
    output:{
        path: './static',
        filename: 'orders.bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react','esv']
                }
            },
        ]
    }
};