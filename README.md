# guess-npm-dist-tag

Automatically determine the dist-tag from the current latest and the new version number when `npm publish`.

[![npm version][npm-image]][npm-url]
![supported Node.js version][node-version]
[![ci status][ci-image]][ci-url]
![license][license]

## Usage: CLI

```console
$ npx guess-npm-dist-tag
latest
```

Compare the version number of the local `package.json` in CWD with the latest version retrieved from the npm registry and output the most appropriate dist-tag like `latest`, `latest-3`or`next`.

## License

MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;

[npm-image]: https://badgen.net/npm/v/guess-npm-dist-tag?icon=npm&label=
[npm-url]: https://npmjs.org/package/guess-npm-dist-tag
[node-version]: https://badgen.net/npm/node/guess-npm-dist-tag
[license]: https://badgen.net/npm/license/guess-npm-dist-tag
[ci-image]: https://github.com/teppeis/guess-npm-dist-tag/workflows/ci/badge.svg
[ci-url]: https://github.com/teppeis/guess-npm-dist-tag/actions?query=workflow%3Aci
