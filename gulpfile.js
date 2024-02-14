const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done) {
    //paso 1: identificar el archivo que vamos a compilar
    //paso 2: compilarla
    //paso 3: guardar el css
    src('./src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css')); //le decimos cual archivo va a compilar

    done();
}

function imagenes() {
    return src('./src/img/**/*').pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('./src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);
