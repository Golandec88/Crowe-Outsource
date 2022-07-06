const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {
  HotModuleReplacementPlugin,
  ProvidePlugin,
  DefinePlugin,
  SourceMapDevToolPlugin,
} = require("webpack");

const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    open: false,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: require("./proxy")(process.env),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.(scss|css)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [[require("autoprefixer")]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, "node_modules")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
      "@types": path.resolve(__dirname, "src/types"),
      "@store": path.resolve(__dirname, "src/store"),
      "@views": path.resolve(__dirname, "src/views"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@static": path.resolve(__dirname, "src/static"),
      "@services": path.resolve(__dirname, "src/services"),
      "@hooks": path.resolve(__dirname, "src/utils/hooks"),
      "@fonts": path.resolve(__dirname, "src/static/fonts"),
      "@modules": path.resolve(__dirname, "src/store/modules"),
      "@components": path.resolve(__dirname, "src/components"),
      "@forms": path.resolve(__dirname, "src/components/forms"),
      "@contexts": path.resolve(__dirname, "src/utils/contexts"),
      "@fields": path.resolve(__dirname, "src/components/fields"),
      "@buttons": path.resolve(__dirname, "src/components/buttons"),
    },
    extensions: ["", ".js", ".jsx", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].css",
    }),
    new ProvidePlugin({
      React: "react",
    }),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      "process.env": dotenv.parsed,
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          name: "vendors",
          chunks: "all",
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
    runtimeChunk: true,
  },
};
