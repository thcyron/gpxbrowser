"use strict";

import gulp from "gulp";
import babel from "gulp-babel";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";

gulp.task("css", () => {
  return gulp
    .src("src/css/main.scss")
    .pipe(sass.sync())
    .pipe(gulp.dest("dist"));
});

gulp.task("js", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task("html", () => {
  return gulp
    .src("src/index.html")
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/css/**/*.scss", ["css"]);
  gulp.watch("src/index.html", ["html"]);
});

gulp.task("default", ["css", "js", "html"]);
