const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css(done) {
	//paso 1: identificar el archivo que vamos a compilar
	//paso 2: compilarla
	//paso 3: guardar el css
	src('./src/scss/app.scss')
		.pipe(sourcemaps.init()) //ESTA LINEA VA ANTES DE COMPILAR
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write('.')) //ESTA LINEA VA DESPUES DE COMPILAR
		.pipe(dest('build/css')); //le decimos cual archivo va a compilar

	done();
}

function imagenes() {
	return src('./src/img/**/*')
		.pipe(imagemin({ optimizationlevel: 3 }))
		.pipe(dest('build/img'));
}

function versionWebp() {
	const opciones = {
		quality: 50,
	};
	return src('src/img/**/*.{png,jpg}').pipe(webp(opciones)).pipe(dest('build/img'));
}

function versionAvif() {
	const opciones = {
		quality: 50,
	};
	return src('src/img/**/*.{png,jpg}').pipe(avif(opciones)).pipe(dest('build/img'));
}

function dev() {
	watch('src/scss/**/*.scss', css);
	watch('./src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
