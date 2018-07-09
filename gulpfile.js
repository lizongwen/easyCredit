const gutil = require('gulp-util');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const rename = require("gulp-rename");
const rev = require('gulp-rev');
const useref = require('gulp-useref');
const revReplace = require('gulp-rev-replace');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const path = require('path');
const connect = require('gulp-connect');
const autoprefix = new LessAutoprefix({
	browsers: ['last 2 versions']
});
//编译less
gulp.task('less', function(cb) {
	console.log(path.join(__dirname, 'less', 'includes'))
	pump([
		gulp.src('./src/**/*.less'),
		less(),
		gulp.dest('sport')
	], cb);

});

// gulp.task('less', (cb) => {
	// pump([
		// gulp.src('./src/**/*.less'),
		// less(),
		// gulp.dest('dist8/style'),
	// ], cb);
// });
//压缩JS
// gulp.task('compress', (cb) => {
// 	pump([
// 		gulp.src('./src/**/*.js'),
// 		uglify(),
// 		gulp.dest('dist'),
// 	], cb);
// });
// //压缩CSS
//  gulp.task('minify-css', (cb) => {
// 	pump([
// 		gulp.src('./src/**/*.css'),
// 		autoprefixer({
// 			browsers: ['last 2 versions'],
// 			cascade: false
// 		}),
// 		cleanCSS({
// 			compatibility: 'ie8'
// 		}),
// 		gulp.dest('dist6'),
// 	], cb);
// });

// //压缩html
// gulp.task('minify-html', (cb) => {
// 	pump([
// 		gulp.src('./src/**/*.html'),
// 		htmlmin({
// 			collapseWhitespace: true
// 		}),
// 		gulp.dest('dist')
// 	], cb);
// });

// //压缩图片
// gulp.task('minify-img', (cb) => {
// 	pump([
// 		gulp.src('src/public/image/*.{png,jpg,gif,ico}'),
// 		//imagemin(),
// 		gulp.dest('dist/public/image'),
// 	], cb);
// });

// //处理字体
// gulp.task('handle-fonts', (cb) => {
// 	pump([
// 		gulp.src('src/public/fonts/*.*'),
// 		//imagemin(),
// 		gulp.dest('dist/public/fonts'),
// 	], cb);
// });

// //MD5
// gulp.task("revision", ['minify-css', 'compress'], (cb) => {
// 	pump([
// 		gulp.src(["./dist/**/*.css", "./dist/**/*.js"]),
// 		rev(),
// 		gulp.dest('dist'),
// 		rev.manifest(),
// 		gulp.dest('dist')
// 	], cb);
// })

// //修改HTML资源路径
// gulp.task("revreplace", ['revision', 'minify-html',], (cb) => {
// 	var manifest = gulp.src("./dist/rev-manifest.json");
// 	pump([
// 		gulp.src("./dist/**/*.html"),
// 		revReplace({
// 			manifest: manifest
// 		}),
// 		gulp.dest('dist')
// 	], cb);
// });

//启动服务
gulp.task('webserver', () => {
	connect.server({
		port: 8888,
		livereload: true
	})
});

//定义看守任务
gulp.task('watch', function () {
    gulp.watch('./src/style/*.less',['less']);  //监听html目录下所有文件
});


// gulp.task('default', ['revision', 'revreplace', 'minify-img', 'handle-fonts','connect'], function () {
// 	console.log('任务已完成');
// });

gulp.task('default', ['webserver','less','watch'], function () {
	console.log('任务已完成');
});