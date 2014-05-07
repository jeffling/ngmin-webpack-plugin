# Usage

In your webpack config: 

```
var ngminPlugin = require("ngmin-webpack-plugin");

module.exports = {
  // your config and junk
  plugins: [
    new ngminPlugin() // or, new ngminPlugin({dynamic: true}) for dynamic mode.
  ]
}
```

As a more realistic example, if you're running webpack from a script (like gulp or grunt): 

```
var ngminPlugin = require("ngmin-webpack-plugin");
var webpackConfig = require("./webpack.config.js");

if (argv.production) {  # --production option
  webpackConfig.plugins = webpackConfig.plugins.concat(new ngminPlugin(), new webpack.optimize.UglifyJsPlugin());
  webpackConfig.devtool = false;
}

webpack webpackConfig, (err, stats) ->
  if (err)
    throw new err
  console.log stats.toString
```
