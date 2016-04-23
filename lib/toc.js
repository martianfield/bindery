'use strict'

const path = require('path')

const fromFiles = (files) => {
  let toc = {}
  files.forEach(file => {
    let finfo = path.parse(file.path)
    if(finfo.dir === '') {
      toc[finfo.base] = {}
    }
    else {
      let dirs = finfo.dir.split(path.sep)
      let current = toc
      dirs.forEach(dir => {
        if(!current.hasOwnProperty(dir)) {
          current[dir] = {}
        }
        current = current[dir]
      })
      current[finfo.base] = {}
    }

  })
  return toc
}


module.exports.fromFiles = fromFiles