module.exports = {
  entry: ['babel-polyfill', "./carousely.js"],
  output: {
    filename: "carousely.bundle.js"
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
