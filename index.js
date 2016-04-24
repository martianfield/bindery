'use strict'

const bitbucket = require(__dirname + '/lib/bitbucket')


// bitbucket.demo()
//   .then(data => { console.log(data) })
//   .catch(err => { console.error(err) })

// bitbucket.changesets('martianfield', 'bindery_test')
//   .then(data => { console.log(data) })
//   .catch(err => { console.error(err) })


bitbucket.files('martianfield', 'bindery_test')
  .then(data => { console.log("done:", data) })
  .catch(err => { console.error(err) })

// bitbucket.file('martianfield', 'bindery_test', 'dc804605bb17', 'sub1/test_sub_2.md')
//   .then(data => { console.log("src:", data)})
//   .catch(err => { console.error(err)})