# gulp-irebase

## Install

With [npm](https://github.com/sakhunzai/gulp-irebase.git#v1.0) do:

```
npm install https://github.com/sakhunzai/gulp-irebase.git#v1.0 --save-dev
```


## Example

```js
var gulp = require('gulp');
var rebase = require('gulp-irebase');

gulp.task('default', function() {
    return gulp.src('./main.css')
        .pipe(rebase())
        .pipe(gulp.dest('./out'));
});
```

## API


`irebase(options)`
* `options`: (since 1.0.0)
    * `srcDir`: (default `null`) path to source directory 
		Type `Function`, `Null`, `String`
	* `destDir`: (default `./`)  path to destination directory
		Type `String`
	* `search`: (default `/url\((((?!http(s?)\:).)*?)\)/ig`) Regexp to find and replace urls( local references)
		Type `Regexp`
	* `replace`: (default `Function`) Replace function takes `file` as argument and `String` or `Function` 
		Type `Function`	
    * `rebaseUrls`: (default `true`) Adjust any relative URL to the location of the target file.
		Type `Boolean`
    * `removeMapUrls`: (default `true`) Remove source map ulrs in target file.
		Type `Boolean`
	* `mapRegexp`: (default `/\/\*#\s*sourceMappingURL\s*.*?\*\//ig`) Regexp to remove sourcemap urls
		Type `Regexp`


#### defaults options

```js
  {
     srcDir: null,
     destDir: './',
     search:/url\((((?!http(s?)\:).)*?)\)/ig,
     replace:function(file){
         return function(url,src){
             return 'url("'+path.relative(opts.destDir,getDir(file,unquote(src)))+'")';
         };
     },
     rebaseUrls: true,
     removeMapUrls: true,
     mapRegexp: /\/\*#\s*sourceMappingURL\s*.*?\*\//ig
 }
```
## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ sakhunzai

