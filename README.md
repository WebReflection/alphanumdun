# alphanumdun

Alphanumeric + `-` (*dash*) and `_` (*underscore*) is what [this W3C specification is after](https://wicg.github.io/file-system-access/#api-filepickeroptions-starting-directory):

> A _**valid path id**_ is a [string](https://infra.spec.whatwg.org/#string) where each character is [ASCII alphanumeric](https://infra.spec.whatwg.org/#ascii-alphanumeric) or "_" or "-".

I have no idea why *W3C* would define such limitation/spec around what could be used as unique identifier for what is going to be used as **path**, where `/` or even `:\\` are common and valid chars, among all others, but sure thing I am pragmatic enough that "*I don't care*", I just want users of my libraries to be able to `vfs.mount('/tmp')` to define `/tmp` as unique idenfitier for their mounted folder into any virtual FileSystem so this is what this library does:

  * `encode(str)` to return a "*safe to be used*" string to define a unique mounting path
  * `decode(encoded_str)` to return the original value of that string used to mount such path

```js
import * as id from 'https://esm.run/alphanumdun';

console.assert(id.decode(id.encode('/test')) === '/test');
// that's it, that `/test` will work when you use it
// as 'id` for the FileSystemHandle API
```

## Implementation Details

This 2 (effective) LOC utility simply excludes `-` as valid char and converts anything that is not `a-z`, `A-Z` or `0-9` into its *base36* counterpart surrounded by `-` accepted chars to guarantee every intent is unique but penalizing strings that heavily use `-` within their value.

That's it, you can convert back and forward anything you like and use that as `id` in any *FileSystemHandle* related operation that accepts such `id` as optional *hint*.

## Reasons behind `-` as penalized char

First of all, the easy way to convert any string to an alphanumeric compatible value is [base36](https://en.wikipedia.org/wiki/Base36), which is also the top conversion utility we have for numbers in *JS* so that `(1234567890).toString(36)` would produce `kf12oi` which is fully compatible with the alphanumeric ID the specs expect.

Now, because it's possible to use also `_` or `-` as identifier, the choice to avoid collision around users' defined entries and actual transformation is left between those two chars.

As a both *JS* and *Python* developer, I know that imports from *Python* accept `_` as module name, due syntax restrictions, but not `-` so that `import my-module` would fail but `import my_module` wouldn't.

And that's it, since most people out there developing and using the *FileSystemHandle* primitive will need to deal with syntax constraints and/or *Python*, I've felt like it was natural to keep the `_` char that is widely supported in various *PLs* syntaxes, and exclude `-` from the equation so that `-` or the explicit `-19-` input would produce two entirely different unique identifiers as output 🥳

- - -

> "*wait ... WUT? Python on the Web?*"

Sure thing: [PyScript](https://pyscript.net/)
