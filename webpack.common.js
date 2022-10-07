module.exports = {
    entry: {
        main: "./src/index.ts",
    },
    module: {
        rules: [
            {
            test: /\.html$/i,
            loader: "html-loader",  
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}