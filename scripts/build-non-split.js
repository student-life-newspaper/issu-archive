const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');

// Disable code splitting
config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};

config.optimization.runtimeChunk = false;

// Renames main.00455bcf.js to main.js
config.output.filename = 'static/js/[name].js';

// Find the plugin that handles CSS extraction
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssPlugin = config.plugins.find(plugin => plugin instanceof MiniCssExtractPlugin);

if (cssPlugin) {
  cssPlugin.options.filename = 'static/css/[name].css';
  cssPlugin.options.moduleFilename = () => 'static/css/main.css';
} else {
  console.error('MiniCssExtractPlugin not found in the Webpack plugins.');
}
