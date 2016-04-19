'use strict'

const bitbucket = require(__dirname + '/lib/bitbucket')

/*
bitbucket.demo()
  .then(data => { console.log(data) })
  .catch(err => { console.error(err) })

bitbucket.changesets('martianfield', 'bindery_test')
  .then(data => { console.log(data) })
  .catch(err => { console.error(err) })
*/

bitbucket.files('martianfield', 'bindery_test')
  .then(data => { console.log(data) })
  .catch(err => { console.error(err) })