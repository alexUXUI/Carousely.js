module.exports = {
  entry: ['babel-polyfill', "./carousely.js"],
  output: {
    filename: "bundle.js"
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

// module.exports = {
//     context: __dirname + '/app',
//     entry: ['babel-polyfill', './entries/index.js'],
//     output: {
//         path: 'dist',
//         filename: '[name].js'
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js/,
//                 exclude: /node_modules/,
//                 loader: 'babel',
//                 query: {
//                     presets: ['es2015']
//                 }
//             }
//         ]
//     }
// };
