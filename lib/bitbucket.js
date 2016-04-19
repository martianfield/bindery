'use strict'

const https = require('https')
const setthings = require('setthings')


const defaultOptions = {
  hostname: 'api.bitbucket.org',
  port: 443,
  method: 'GET'
}

const get = (path, success) => {
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
    success(data) // console.log(json)
  })
});
  req.end()

  req.on('error', (e) => {
    console.error(e)
})
}

const demo = (success) => {
  let path = 'https://api.bitbucket.org/2.0/repositories/tutorials/tutorials.bitbucket.org'
  get(path, success)

}

const changesets = (account_name, repo_slug, success) => {
  let path = `https://api.bitbucket.org/1.0/repositories/${account_name}/${repo_slug}/changesets?limit=50`
  get(path, success)
}

module.exports.demo = demo
module.exports.changesets = changesets


