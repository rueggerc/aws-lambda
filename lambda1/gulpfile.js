"use strict";

const gulp = require('gulp');
const runSequence = require('run-sequence');
const path = require('path');
const del = require('del');
const zip = require('gulp-zip');
const tap = require('gulp-tap');

const PROJECT_ROOT = ".";
const DIST_DIR = `${PROJECT_ROOT}/dist`;
const OUTPUT_FILE_NAME = 'lambda1.zip';
const DELIVERY_DIR = "${PROJECT_ROOT}/deliverable";

gulp.task('clean-dist', () => {
  return del.sync(DIST_DIR);
});

gulp.task('clean-delivery', () => {
    return del.sync(DELIVERY_DIR);
});

gulp.task('clean-delivery', () => {
    return del.sync(DELIVERY_DIR);
});

gulp.task('copyBaseFiles', () => {
    return gulp.src(
      [
        `${PROJECT_ROOT}/package.json`,
        `${PROJECT_ROOT}/index.js`
      ]
    )
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copyLibFiles', () => {
  return gulp.src(
    [
      `${PROJECT_ROOT}/lib/**`
    ]
  ).pipe(gulp.dest(`${DIST_DIR}/lib`));
});

gulp.task('clean', () => {
  runSequence(
    'clean-dist',
    'clean-delivery'
  );
});

// Zip dist directory
// We use tab to determine if file should be directory, executable, config or regular
// file and set the mode explicitly in the zip file.
// This allows windows builds to work correctly when unzipping to Linux
gulp.task('zipIt', () => {
  let dirMode = parseInt('40755', 8);
  let fileMode = parseInt('100644', 8);
  return gulp.src(`${DIST_DIR}/**/*`)
         .pipe(tap((file) => {
            if (file.stat.isDirectory() {
              file.state.mode = dirMode;
            } else {
              file.stat.mode = fileMode;
            }
         }))
         .pipe(zip(OUTPUT_FILE_NAME))
         .pipe(gulp.dest(`${DELIVERY_DIR}`));
});

gulp.task('foo', async () => {
  console.log("fooTask");
});

gulp.task('done', async () => {
  console.log(`ZIP file created in ${path.resolve(DELIVERY_DIR)}`);
});

gulp.task('build', async () => {
  runSequence(
    'clean',
    'copyBaseFiles',
    'copyLibFiles',
    'zipIt',
    'done'
  );
});

gulp.task('default', async () => {
  runSequence(
    'clean',
    'copyBaseFiles',
    'copyLibFiles',
    'zipIt',
    'done'
  );
});

