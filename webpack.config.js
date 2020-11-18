const path = require("path")
const webpack =  require('webpack')

module.exports = {
  mode: 'development',
  
  entry: "./src/main.js",
  output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "public")
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: './public',
    port: 8080,
    overlay: {
      warnings: true,
      errors: true
    }
  },

  watch: true,

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
}
