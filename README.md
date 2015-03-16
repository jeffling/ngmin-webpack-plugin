**Deprecated for the most part**

ngmin is no longer the best dependency annotator to use. btford recommends using ng-annotate. of course, there's a plugin for that right here: https://github.com/jeffling/ng-annotate-webpack-plugin. 

That being said, if you _have_ to use ngmin, and you se a bug, feel free to make an issue and I'll try my best to help.

# ngmin-webpack-plugin

Runs the [ngmin](http://github.com/btford/ngmin) pre-minimizer to insert AngularJS DI annotations, so instead of writing
```javascript
angular.module('whatever')
.controller('MyCtrl', ['$scope', '$http', 
  function ($scope, $http) { ... }]);
```
you can write 
```javascript
angular.module('whatever')
.controller('MyCtrl', function ($scope, $http) { ... });
```

# Usage

In your webpack config: 

```javascript
var ngminPlugin = require("ngmin-webpack-plugin");

module.exports = {
  // your config and junk
  plugins: [
    new ngminPlugin() // or, new ngminPlugin({dynamic: true}) for dynamic mode.
  ]
}
```

As a more realistic example, if you're running webpack from a script (like gulp or grunt): 

```javascript
var webpack = require("webpack");
var ngminPlugin = require("ngmin-webpack-plugin");
var webpackConfig = require("./webpack.config.js");
var argv = require("minimist")(process.argv.slice(2));

// --production option
if (argv.production) {  
  webpackConfig.plugins = webpackConfig.plugins.concat(new ngminPlugin(), new webpack.optimize.UglifyJsPlugin());
  webpackConfig.devtool = false;
}

webpack webpackConfig, (err, stats) ->
  if (err)
    throw err
  console.log stats.toString
```
