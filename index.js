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

    }

    opts= extend(defaults,opts);

    function getDir(file,src){
        var dir=opts.srcDir;
        if(typeof opts.srcDir=='function'){
            dir=opts.srcDir(file,opts);
        }else if(opts.srcDir==null)
            dir=path.parse(file.path).dir;

        return path.join(dir, src);
    }

    function _rebase(file){
        return String(file.contents)
            .replace(opts.search,opts.replace(file));
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