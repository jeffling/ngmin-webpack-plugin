ngmin = require 'ngmin'
OriginalSource = require 'webpack-core/lib/OriginalSource'

class NgMinPlugin
  constructor: (@options) ->
    @options = {}  if typeof @options isnt 'object'

  apply: (compiler) ->
    compiler.plugin 'compilation', (compilation) ->
      compilation.plugin 'optimize-chunk-assets', (chunks, callback) ->
        files = []
        
        chunks.forEach (chunk) ->
          chunk.files.forEach (file) ->
            files.push file

        compilation.additionalChunkAssets.forEach (file) ->
          files.push file

        files.forEach (file) ->
          map = compilation.assets[file].map() # preserve the map
          value = ngmin.annotate compilation.assets[file].source(), @options
          compilation.assets[file] = new OriginalSource value, file, map

        callback()

module.exports = NgMinPlugin