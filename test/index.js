'use strict'

const test = require('ava')
const ms = require('ms')

const CloudFlareWorkersKV = require('..')

const store = new CloudFlareWorkersKV({
  accountId: process.env.CF_ACCOUNT_ID,
  key: process.env.CF_KEY,
  namespaceId: process.env.CF_NAMESPACE_ID
})

test.serial('.set', async t => {
  const result = await store.set(
    'cloudflare-workers-kv:test',
    { foo: 'bar' },
    ms('1m')
  )
  t.is(result, true)
})

test.serial('.get', async t => {
  t.deepEqual(await store.get('cloudflare-workers-kv:test'), { foo: 'bar' })
  t.is(await store.get('cloudflare-workers-kv:notexist'), undefined)
})

test('.delete', async t => {
  t.is(true, await store.delete('cloudflare-workers-kv:test'))
  t.is(true, await store.delete('cloudflare-workers-kv:notexist'))
})
