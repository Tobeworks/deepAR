const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, argv) => {

  return { entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      templateParameters: {
        utag_env: process.env.NODE_ENV ? 'prod' : 'dev',
        utag_page: 'catrice.eu',
      },
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(wasm)|(bin)|(obj)$/i,
        include: [
          path.resolve(__dirname, 'node_modules/deepar/'),
        ],
        type: 'asset/resource',
      },
      {
        include: [
          path.resolve(__dirname, 'effects/'),
        ],
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@effects': path.resolve(__dirname, 'effects/'),
    },
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 10000000,
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "public"),
      },
      {
        directory: path.join(__dirname, "node_modules/deepar"),
        publicPath: "/deepar-resources",
      },
    ],
    compress: true,
    port: 9000,
  }
  }
};
