# cloudflare-workers-kv

> Node.js library to interact with [CloudFlare Workers KV](https://developers.cloudflare.com/workers/reference/storage).

## Install

```bash
$ npm install cloudflare-workers-kv --save
```

## Usage

```js
const cloudFlareWorkersKV = require('cloudflare-workers-kv')
const ms = require('ms')

const store = cloudFlareWorkersKV({
  accountId: "<Cloudflare-Account-Id>",
  email: "<Cloudflare-Email>",
  key: "<Cloudflare-API-Key>",
  namespaceId: "<Cloudflare-Workers-KV-Namespace-Id>"
})

// get a value
await store.get('foo')

// set a value forever
await store.set('foo', 'bar', ms('5m'))

// set a value associating with a time-to-live associated
await store.set('foo', 'bar', ms('5m'))

// delete a value
await store.delete('foo')

// delete all values
await store.clear('foo')
```

## License

**cloudflare-workers-kv** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/cloudflare-workers-kv/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/cloudflare-workers-kv/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
