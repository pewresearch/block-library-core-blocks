const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = { ...defaultConfig, devtool: "source-map" };
