'use strict'

const fetch = require('isomorphic-fetch')

const throwError = ({ message, code }) => {
  const error = new Error(`${message}`)
  error.code = code
  throw error
}

const authentication = ({ email, key }) =>
  email
    ? { 'X-Auth-Email': email, 'X-Auth-Key': key }
    : { Authorization: `Bearer ${key}` }

function CloudFlareWorkersKV (options) {
  if (!(this instanceof CloudFlareWorkersKV)) {
    return new CloudFlareWorkersKV(options)
  }

  const { accountId, email, key, namespaceId } = options
  const auth = authentication({ email, key })

  const baseUrl = (key = '') =>
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`

  const fetchOptions = (opts = {}, props) => ({
    ...opts,
    headers: {
      ...opts.headers,
      ...auth
    },
    ...props
  })

  const get = async (key, opts) => {
    const response = await fetch(baseUrl(key), fetchOptions(opts))
    if (response.status === 404) return undefined
    return response.json()
  }

  const set = async (key, value, ttl, opts = {}) => {
    const url = baseUrl(key)
    const searchParams = new URLSearchParams(
      ttl ? { expiration_ttl: ttl / 1000 } : {}
    )

    const { success, errors } = await fetch(
      `${url}?${searchParams.toString()}`,
      fetchOptions(opts, { body: JSON.stringify(value), method: 'PUT' })
    ).then(res => res.json())

    return success || throwError(errors[0])
  }

  const _delete = async (key, opts) => {
    await fetch(baseUrl(key), fetchOptions(opts, { method: 'DELETE' }))
    return true
  }

  return { get, set, delete: _delete }
}

module.exports = CloudFlareWorkersKV
