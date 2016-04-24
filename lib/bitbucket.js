'use strict'

const https = require('https')
const setthings = require('setthings')


const defaultOptions = {
  hostname: 'api.bitbucket.org',
  port: 443,
  method: 'GET'
}

const get = (url, toJson) => {
  toJson = toJson === undefined ? true : toJson
  return new Promise((resolve, reject) => {
    let options = { path: url }
    setthings.merge(options, defaultOptions)

    var req = https.request(options, (res) => {
      // res.statusCode, res.headers
      let data = ''
      res.on('data', (d) => {
        data += d
      })
      res.on('end', () => {
        if(toJson) {
          resolve(JSON.parse(data))
        }
        else {
          resolve(data)
        }
      })
    })
    req.end()
    req.on('error', (e) => {
      reject(e)
    })
  })

}

const demo = () => {
  let url = 'https://api.bitbucket.org/2.0/repositories/tutorials/tutorials.bitbucket.org'
  return get(url)

}

const changesets = (account_name, repo_slug, limit) => {
  limit = limit === undefined ? 50 : limit
  let url = `https://api.bitbucket.org/1.0/repositories/${account_name}/${repo_slug}/changesets?limit=${limit}`
  return get(url)
}

const file = (accountname, repo_slug, revision, path) => {
  let url = `https://api.bitbucket.org/1.0/repositories/${accountname}/${repo_slug}/raw/${revision}/${path}`
  return get(url, false)
}

const files = (account_name, repo_slug) => {
  return new Promise((resolve, reject) => {
    // first we need to get the latest changeset to get the revision (the .node or .raw_node property)
    changesets(account_name, repo_slug, 1)
      .then(data => {
        let revision = data.changesets[0].raw_node // could also use the shorter .node
        // then we get the files of the latest revision
        return files_in_directory(account_name, repo_slug, revision, '', true, [])
      })
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}


const files_in_directory = (account_name, repo_slug, revision, directory, recursive, files) => {
  directory = directory === undefined ? '' : directory
  recursive = recursive === undefined ? true : recursive
  files = files === undefined ? [] : files

  return new Promise((resolve, reject) => {
    let path = `https://api.bitbucket.org/1.0/repositories/${account_name}/${repo_slug}/src/${revision}/${directory}`
    get(path)
      .then(data => {
        // collect the files
        for(let i=0; i < data.files.length; i++) {
          let finfo = data.files[i]
          finfo.utcticks = Date.parse(finfo.utctimestamp)
          files.push(finfo)
        }
        // do we need to look at subfolders?
        if(recursive) {
          // are there subdirectories?
          if(data.directories.length > 0) {
            let ps = []
            for(let i=0; i<data.directories.length; i++) {
              ps.push(files_in_directory(account_name, repo_slug, revision, data.directories[i], recursive, files))
            }
            return Promise.all(ps)
          }
        }
      })
      .then(data => {
        resolve(files)
      })
      .catch(err => {
        reject(err)
      })
  })

}

module.exports.demo = demo
module.exports.changesets = changesets
module.exports.files = files
module.exports.file = file


