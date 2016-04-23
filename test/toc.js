'use strict'

const expect = require('chai').expect
const toc = require(__dirname + '/../lib/toc.js')

describe("toc", () => {
  it("fromFiles()", () => {
    // arrange
    let files = [{path:'a.md'}, {path:'sub1/b.md'}, {path:'sub1/sub2/c.md'}]
    // act
    let t1 = toc.fromFiles(files)
    // assert
    expect(t1).to.deep.equal({
      'a.md':{},
      'sub1':{
        'b.md':{},
        'sub2':{
          'c.md':{}
        }
      }
    })
  })
})