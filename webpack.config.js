module.exports = {
  entry: ['babel-polyfill', "./src/carousely.js"],
  output: {
    filename: "./dist/carousely.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  watch: true
}
