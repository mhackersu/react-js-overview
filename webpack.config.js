const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      /*
       **       These are like "pre-processors"
       */
      { test: /\.(js)$/, use: "babel-loader" }, // (js) will select all JS files
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  /*
   **   Development mode
   */
  mode: "development",
  plugins: [
    /*
     **     Use the ./app/index.html as a template and create a new index.html while also adding the new index.js bundle
     */
    new HtmlWebpackPlugin({
      template: "app/index.html"
    })
  ]
};
