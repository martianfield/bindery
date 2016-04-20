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
        resolve(json)
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

const changesets = (account_name, repo_slug, limit) => {
  limit = limit === undefined ? 50 : limit
  let path = `https://api.bitbucket.org/1.0/repositories/${account_name}/${repo_slug}/changesets?limit=${limit}`
  return get(path)
}

const files = (account_name, repo_slug) => {
  return new Promise((resolve, reject) => {
    // first we need to get the latest changeset to get the revision (the .node or .raw_node property)
    changesets(account_name, repo_slug, 1)
      .then(data => {
        let revision = data.changesets[0].raw_node // could also use the shorter .node
        // then we get the files of the latest revision
        return files_in_directory(account_name, repo_slug, revision)
      })
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}


const files_in_directory = (account_name, repo_slug, revision, directory) => {
  directory = directory === undefined ? '' : directory
  console.log("directory:", directory)
  return new Promise((resolve, reject) => {
    let path = `https://api.bitbucket.org/1.0/repositories/${account_name}/${repo_slug}/src/${revision}/${directory}`
    get(path)
      .then(data => {
        if(data.directories.length > 0) {
          let ps = []
          for(let i=0; i<data.directories.length; i++) {
            ps.push(files_in_directory(account_name, repo_slug, revision, data.directories[i]))
          }
          return Promise.all(ps)
        }
        else {
          return data
          //resolve(data)
        }
      })
      .then(data => {
        console.log("A")
        console.log(data)
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })

}

module.exports.demo = demo
module.exports.changesets = changesets
module.exports.files = files


