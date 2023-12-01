// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");

const config = {
  mode: "production",
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    library: "tech-mech-lib",
    libraryTarget: "umd",
    filename:"index.js"
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  devtool: "source-map",
  performance: {
    hints: "warning"
  }
};

module.exports = () => {
  return config;
};
