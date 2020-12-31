const gulp = require('gulp');
const babel = require( 'gulp-babel');
const watch = require( 'gulp-watch');
const log = require( 'fancy-log');
const fs = require( 'fs');
const path = require( 'path');
const mjml2html = require( 'mjml');
const registerComponent = require( 'mjml-core').registerComponent;

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach((file) => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : filelist.concat(path.join(dir, file))
    })
    return filelist
}

const watchedComponents = walkSync('./gulp/components')

const compile = () => {
    return gulp
        .src(path.normalize('./gulp/components/**/*.js'))
        .pipe(
            babel({
                presets: ['@babel/preset-env'],
            })
        )
        .on('error', log)
        .pipe(gulp.dest('lib'))
        .on('end', () => {
            watchedComponents.forEach((compPath) => {
                const fullPath = path.join(
                    process.cwd(),
                    compPath.replace(/^gulp\/components/, 'lib')
                )
                delete require.cache[fullPath]
                registerComponent(require(fullPath).default)
            })

            fs.readFile(path.normalize('./index.mjml'), 'utf8', (err, data) => {
                if (err) throw err
                const result = mjml2html(data)
                fs.writeFileSync(path.normalize('./index.html'), result.html)
            })
        })
}

gulp.task('build', compile)

gulp.task('watch', () => {
    compile()
    return watch(
        [path.normalize('./gulp/components/**/*.js'), path.normalize('index.mjml')],
        compile
    )
})
