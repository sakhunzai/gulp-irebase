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

### rebase(options)

#### options

Type: `Array`

```js
 var options={
 	srcDir: null,
	destDir: "./",
	
 }
```



