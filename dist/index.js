// Generated by CoffeeScript 1.6.3
(function() {
  var NgMinPlugin, OriginalSource, ngmin;

  ngmin = require('ngmin');

  OriginalSource = require('webpack-core/lib/OriginalSource');

  NgMinPlugin = (function() {
    function NgMinPlugin(options) {
      this.options = options;
      if (typeof this.options !== 'object') {
        this.options = {};
      }
    }

    NgMinPlugin.prototype.apply = function(compiler) {
      return compiler.plugin('compilation', function(compilation) {
        return compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
          var files;
          files = [];
          chunks.forEach(function(chunk) {
            return chunk.files.forEach(function(file) {
              return files.push(file);
            });
          });
          compilation.additionalChunkAssets.forEach(function(file) {
            return files.push(file);
          });
          files.forEach(function(file) {
            var map, value;
            map = compilation.assets[file].map();
            value = ngmin.annotate(compilation.assets[file].source(), this.options);
            return compilation.assets[file] = new OriginalSource(value, file, map);
          });
          return callback();
        });
      });
    };

    return NgMinPlugin;

  })();

  module.exports = NgMinPlugin;

}).call(this);
