/**
 * 1.开发阶段，不去构建图片，字体，公共public，所以用serev时，baseDir指定为一个数组   baseDir: ['dist','src','public']，这样开发阶段不用构建图片，字体，公共public
 *  2.files: 'dist/**',//监听dist文件下变化实时更新 不用这种方法，就在上面定义各个方法时，reload一下，比如page里面加上.pipe(bs.reload({ stream: true })),这里stream: true指，以流的方式推入浏览器
 * 3.
 */
const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')//清除文件。返回的是promise
const browserSync = require('browser-sync')//引入服务器，监听变化
const bs = browserSync.create()//创建一个服务器

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const clear = () => {
  return del(['dist', 'temp'])//删除dist文件
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src('src/*.html')
    .pipe(plugins.swig({ data, defaults: { cache: false } }))// 防止模板缓存导致页面不能及时更新
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))

}


const complete = parallel(script, page, style)//编译src目录下的组合



const serve = () => {//初始化服务器配置
  watch('src/assets/styles/*.scss', style)//监视第一个参数路径的里面是否变化，变化就执行第二个参数任务
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'], bs.reload)
  bs.init({
    notify: false,//右上角是否连上browser-sync提示是否关掉
    port: 8080,//默认是3000,
    open: false,//是否默认打开
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'//basic.html文件里面node_modules的样式路由到node_modules文件下找
      }
    }
  })
}
const useref = () => {//编译dist文件下的文件,可以解析注释生成对应js，css 比如生成了vendor.js
  return src('temp/*.html')
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'))
}

const develop = series(complete, serve)//开发阶段执行这个就够了


const build = series(clear, parallel(extra, series(complete, useref), font, image))//编译整个public和src，这里用series,先去清除dist文件，再生成新的,上线之前执行build任务，开发阶段不需要构建图片字体等，没有必要，本来构建的图片字体就是原样压缩的 
module.exports = {
  // complete,
  clear,
  build,
  develop
}