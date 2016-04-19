'use strict'

const https = require('https')
const setthings = require('setthings')


const defaultOptions = {
  hostname: 'api.bitbucket.org',
  port: 443,
  method: 'GET'
}

const get = (path) => {
  return new Promise((resolve, reject) => {
    let options = { path: path }
    setthings.merge(options, defaultOptions)

    var req = https.request(options, (res) => {
      // res.statusCode, res.headers
      let data = ''
      res.on('data', (d) => {
        data += d
      })
      res.on('end', () => {
        let json = JSON.parse(data)
        resolve(data) // console.log(json)
      })
    })
    req.end()
    req.on('error', (e) => {
      reject(e)
    })
  })

}

const demo = () => {
  let path = 'https://api.bitbucket.org/2.0/repositories/tutorials/tutorials.bitbucket.org'
  return get(path)

}

const changesets = (account_name, repo_slug) => {
  let path = `https://api.bitbucket.org/1.0/repositories/${account_name}/${repo_slug}/changesets?limit=50`
  return get(path)
}

module.exports.demo = demo
module.exports.changesets = changesets


