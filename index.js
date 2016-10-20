'use strict';

var path = require('path');
var through = require('through2');
var unquote = require('unquote');
var extend  = require('util')._extend;
var gutil = require('gulp-util');

var PLUGIN_NAME ='gulp-irebase';
 
module.exports = function(opts) {
    opts = opts || {};

    var defaults= {
        srcDir: null,
        destDir: './',
        search:/url\((.*?)\)/ig,
        replace:function(file){
            return function(url,src){
                return 'url("'+path.relative(opts.destDir,getDir(file,unquote(src)))+'")';
            };
        },
        rebaseUrls: true,
        removeMapUrls: true,
        mapRegexp: /\/\*#\s*sourceMappingURL\s*.*?\*\//ig
    }

    opts= extend(defaults,opts);

    function getDir(file,src){
        var dir=opts.srcDir;
        if(typeof opts.srcDir=='function'){
            dir=opts.srcDir(file,opts);
        }else if(opts.srcDir==null){
            dir=path.dirname(file.path);
        }

        return path.join(dir, src);
    }

    function _rebase(file){
        var data = String(file.contents);
        
        if(opts.rebaseUrls){
            data=data.replace(opts.search,opts.replace(file))
        }
        
        if(opts.removeMapUrls){
            data=data.replace(opts.mapRegexp,'');
        }
        
        return data;
    }

    function _cleanMapUrl(data)
    {
        if(opts.removeMapUrl==true){
            return data.replace(opts.mapRegexp,'');
        }
        return data;
    }
    
    return through.obj(function(file, encoding, callback) {
        if(file.isNull()) return  callback(null,file);

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }

        if(file.isBuffer()){
            file.contents=new Buffer(_rebase(file));
            return  callback(null,file);
        }
    });
};