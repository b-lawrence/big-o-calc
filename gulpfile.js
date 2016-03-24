const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  bower = require('gulp-bower'),
  paths = {
    scripts: [
      './assets/js/themes-list.js',
      './assets/js/editor.js',
      './assets/js/main.js'
    ],
    styles: './assets/sass/**/*.scss'
  };

gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    verbose: true,
    env: {
      'NODE_ENV': 'development',
      'DEBUG': '* -express:* -send -session -mquery -express-session ' +
        '-engine* -socket.io:* -socket.io-parser -morgan -connect* -stylus*'
    },
    watch: './server',
    ext: 'js hbs css json',
    nodeArgs: ['--debug']
  }).on('restart', () => {
    console.log('Restarted!');
  });
});

gulp.task('scripts', () => {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('bower', () => {
  return bower()
    .pipe(gulp.dest('./public/lib/'));
});

gulp.task('sass', () => {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', () => {
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('build', ['bower', 'scripts', 'sass']);
gulp.task('default', ['build', 'watch', 'nodemon']);
