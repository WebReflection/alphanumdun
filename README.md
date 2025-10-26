# alphanumdun

Alphanumeric + `-` (*dash*) and `_` (*underscore*) is what [this W3C specification is after](https://wicg.github.io/file-system-access/#api-filepickeroptions-starting-directory):

> A _**valid path id**_ is a [string](https://infra.spec.whatwg.org/#string) where each character is [ASCII alphanumeric](https://infra.spec.whatwg.org/#ascii-alphanumeric) or "_" or "-".

I have no idea why *W3C* would define such limitation/spec around what could be used as unique identifier for what is going to be used as **path**, where `/` or even `:\\` are common and valid chars, among all others, but sure thing I am pragmatic enough that "*I don't care*", I just want users of my libraries to be able to `vfs.mount('/tmp')` to define `/tmp` as unique idenfitier for their mounted folder into any virtual FileSystem so this is what this library does:

  * `encode(str)` to return a "*safe to be used*" string to define a unique mounting path
  * `decode(encoded_str)` to return the original value of that string used to mount such path

```js
import * as id from 'https://esm.run/alphanumdun';

console.assert(decode(encode('/test')) === '/test');
// that's it, that `/test` will work when you use it
// as 'id` for the FileSystemHandle API
```