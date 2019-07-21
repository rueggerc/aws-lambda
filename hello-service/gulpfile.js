"use strict";

const path = require('path');
const del = require('del');
const runSequence = require('run-sequence');
const gulp = require('gulp');

const zip = require('gulp-zip');
const tap = require('gulp-tap');
const {exec} = require('child_process');

// Define where files will be place
const PROJECT_ROOT = ".";
const DIST_DIR = `${PROJECT_ROOT}/dist`;
const DELIVERY_DIR = `${PROJECT_ROOT}/deliverable`;

// Output file Name
const FUNCTION_NAME="HELLO-SERVICE";
const OUTPUT_FILE_NAME = `${FUNCTION_NAME}.zip`;

// Delete dist dir
gulp.task('clean-dist', () => {
  return del.sync(DIST_DIR);
});

// Delete delivery dir
gulp.task('clean-delivery', () => {
    return del.sync(DELIVERY_DIR);
});

gulp.task('clean-delivery', () => {
    return del.sync(DELIVERY_DIR);
});

gulp.task('installPackages', (cb) => {
  exec(`cd ${DIST_DIR} && npm install --production=true`, (err => {cb(err)}));
});

gulp.task('copyCommon', () => {
  return gulp.src(
    [`${PAREN_DIR}/common.js`]
  )
  .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copyBaseFiles', () => {
    return gulp.src(
      [
        `${PROJECT_ROOT}/package.json`,
        `${PROJECT_ROOT}/index.js`,
      ]
    )
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copyLibs', () => {
  return gulp.src(
    [
      `${PROJECT_ROOT}/lib/**`
    ]
  ).pipe(gulp.dest(`${DIST_DIR}/lib`));
});

gulp.task('copyModulesFiles', () => {
  return gulp.src(
    [
      `${PROJECT_ROOT}/node_modules/**`
    ]
  ).pipe(gulp.dest(`${DIST_DIR}/node_modules`));
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
            if (file.stat.isDirectory()) {
              file.stat.mode = dirMode;
            } else {
              file.stat.mode = fileMode;
            }
         }))
         .pipe(zip(OUTPUT_FILE_NAME))
         .pipe(gulp.dest(`${DELIVERY_DIR}`));
});

gulp.task('done', () => {
  console.log(`Distribution created in ${path.resolve(DIST_DIR)}`);
  console.log(`Zipped delivery file created in ${path.resolve(DELIVERY_DIR)}`);
  console.log("Done!");
});

gulp.task('clean', () => {
  runSequence(
    'clean-dist',
    'clean-delivery'
  );
});


gulp.task('build', async () => {
  runSequence(
    'clean',
    'copyBaseFiles',
    'copyLibs',
    'installPackages',
    'zipIt',
    'done'
  );
});

