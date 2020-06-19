# cloudflare-workers-kv

> Node.js library to interact with [CloudFlare Workers KV](https://developers.cloudflare.com/workers/reference/storage).

[CloudFlare Workers KV](https://developers.cloudflare.com/workers/reference/storage) is [faster](https://serverless-benchmark.com) &lt;key, value&gt; storage that runs on top of [CloudFlare Network](https://www.cloudflare.com/network) to offer a geo-distributed service almost **free** or reasonable cheaper.

Use it in combination with [CloudFlare Workers](https://workers.cloudflare.com) or [AWS Lambda](https://aws.amazon.com/lambda) to have a truly [serverless database access](https://medium.com/@tjholowaychuk/global-serverless-apps-with-aws-lambda-api-gateway-4642ef1f221d), where the value will be serve from the nearest edge node, being the lowest response latency possible.

## Install

```bash
$ npm install cloudflare-workers-kv --save
```

## Usage

The library is a convenient way to interact with CloudFlare Workers KV via usinng [CloudFlare Workers KV API](https://api.cloudflare.com/#workers-kv-namespace-properties).

```js
const cloudFlareWorkersKV = require('cloudflare-workers-kv')
const ms = require('ms')

const store = cloudFlareWorkersKV({
  accountId: '<Cloudflare-Account-Id>',
  email: '<Cloudflare-Email>',
  key: '<Cloudflare-API-Key>',
  namespaceId: '<Cloudflare-Workers-KV-Namespace-Id>'
})

async function examples () {
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
}
```

## License

**cloudflare-workers-kv** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/cloudflare-workers-kv/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/cloudflare-workers-kv/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
