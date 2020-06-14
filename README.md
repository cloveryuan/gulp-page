# gulp-jsj

[![Build Status][travis-image]][travis-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> gulp 的 相同

## Installation

```shell
$ yarn add gulp-jsj

# or npm
$ npm install gulp-jsj
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const gulpJsj = require('gulp-jsj')
const result = gulpJsj('zce')
// result => 'zce@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### gulpJsj(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; cloveryuan <750363796@qq.com>



[travis-image]: https://img.shields.io/travis/zce/gulp-jsj/master.svg
[travis-url]: https://travis-ci.org/zce/gulp-jsj
[downloads-image]: https://img.shields.io/npm/dm/gulp-jsj.svg
[downloads-url]: https://npmjs.org/package/gulp-jsj
[version-image]: https://img.shields.io/npm/v/gulp-jsj.svg
[version-url]: https://npmjs.org/package/gulp-jsj
[license-image]: https://img.shields.io/github/license/zce/gulp-jsj.svg
[license-url]: https://github.com/zce/gulp-jsj/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/gulp-jsj.svg
[dependency-url]: https://david-dm.org/zce/gulp-jsj
[devdependency-image]: https://img.shields.io/david/dev/zce/gulp-jsj.svg
[devdependency-url]: https://david-dm.org/zce/gulp-jsj?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
