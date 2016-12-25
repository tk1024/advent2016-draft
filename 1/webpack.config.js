module.exports = {
  entry: './src/app.jsx',
  output: {
    path: './',
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
