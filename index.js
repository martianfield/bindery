'use strict'

const bitbucket = require(__dirname + '/lib/bitbucket')

const success = (json) => { console.log(json) }

// bitbucket.demo(success)
bitbucket.changesets('martianfield', 'bindery_test', success)