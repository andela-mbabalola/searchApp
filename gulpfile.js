var gulp = require('gulp'),
  less = require('gulp-less'),
  jade = require('gulp-jade'),
  bower = require('gulp-bower'),
  gutil = require('gulp-util'),
  path = require('path'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  nodemon = require('gulp-nodemon'),
  paths = {
    public: 'public/**',
    jade: ['!app/shared/**', 'app/**/*.jade'],
    scripts: 'app/**/*.js',
    staticFiles: [
      '!app/**/*.+(less|css|js|jade)',
      'app/**/*.*'
    ],
    styles: 'app/styles/*.+(less|css)'
  };

  gulp.task('less', function() {
    return gulp.src(paths.styles)
    .pipe(less({
      path: [path.join(__dirname, './app/styles')]
    }))
    .pipe(gulp.dest('./public/css'));
  });

  gulp.task('jade', function() {
    return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public'));
  });

  gulp.task('bower', function() {
    return bower()
    .pipe(gulp.dest('./public/lib'));
  });

  gulp.task('browserify', function() {
    return browserify('./app/scripts/application.js').bundle()
    .on('success', gutil.log.bind(gutil, 'Browserify Rebundled!'))
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    // vinyl-source-stream makes the bundle compatible with gulp
    .pipe(source('application.js'))
    // Output the file
    .pipe(gulp.dest('./public/js/'));
  });

gulp.task('static-files', function() {
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function() {
  nodemon({
      script: 'server.js',
      ext: 'js',
      ignore: ['public/', 'node_modules/']
    })
    .on('change', ['lint'])
    .on('restart', function() {
      console.log('>> node restart');
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.scripts, ['browserify']);
});

gulp.task('build', ['jade', 'less', 'static-files', 'browserify', 'bower'
]);

gulp.task('default', ['nodemon', 'watch', 'build']);
