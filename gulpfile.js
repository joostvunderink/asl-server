const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const debounce   = require('gulp-debounce');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  // gulp.src('src/**/*.ts', ['scripts'])
  //     .pipe(watch('src/**/*.ts', ['scripts']))
  //     .pipe(debounce({ wait: 1000 }));
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
  nodemon({
    script: 'dist/index.js',
    ext: 'html js',
    delay: 4000,
  });
});

gulp.task('default', ['watch', 'assets']);

gulp.task('nodemon-server', ['watch', 'assets', 'server']);
