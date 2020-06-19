'use strict'

const got = require('got')

const getHeaders = ({ email, key }) => ({
  'X-Auth-Email': email,
  'X-Auth-Key': key
})

function CloudFlareWorkersKV (options) {
  if (!(this instanceof CloudFlareWorkersKV)) {
    return new CloudFlareWorkersKV(options)
  }

  const { accountId, email, key, namespaceId, gotOpts = {} } = options
  const authHeaders = getHeaders({ email, key })

  const _getUrl = (key = '') =>
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`

  const getOpts = (opts = {}, props) => {
    const headers = { ...opts.headers, ...authHeaders }
    return { ...gotOpts, ...opts, headers, ...props }
  }

  const _getAllKeys = opts => {
    const url = _getUrl().replace('/values/', '/keys')
    // TODO: get all keys recursively
    // see https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys
    const searchParams = new URLSearchParams({ limit: 1000 })
    return got.get(url, getOpts(opts, { searchParams })).json()
  }

  const get = async (key, opts) => {
    const url = _getUrl(key)
    return got.get(url, getOpts(opts)).json()
  }

  const _delete = async (key, opts = {}) => {
    const url = _getUrl(key)
    return got.delete(url, getOpts(opts))
  }

  const set = async (key, value, ttl, opts = {}) => {
    const url = _getUrl(key)
    const searchParams = ttl
      ? new URLSearchParams({ expiration_ttl: ttl / 1000 })
      : undefined
    return got.put(url, getOpts(opts, { json: value, searchParams }))
  }

  const clear = async (opts = {}) => {
    const keys = await _getAllKeys(opts)
    const url = _getUrl().replace('/values/', '/bulk')
    return got.delete(url, getOpts(opts, { json: keys }))
  }

  return {
    get,
    set,
    clear,
    delete: _delete
  }
}

module.exports = CloudFlareWorkersKV
