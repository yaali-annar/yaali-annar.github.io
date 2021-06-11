const path = require("path");
const { merge } = require("webpack-merge");
const getRepositoryName = require("git-repo-name").sync;

const common = require("./webpack.common.js");
const { resolve } = require("./import.resolver.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: `/${getRepositoryName()}/`,
    filename: "[name].[contenthash].js",
  },
  resolve,
});
