const chai      = require('chai')
const expect    = chai.expect
const {sendUploadToGCS, getPublicUrl} = require('../middlewares/uploadGCS')

describe('GET PUBLIC URL',() => {
  it('should return url string', done => {
    var url = getPublicUrl('image')
    expect(url).to.be.a('string')
    done()
  })
})
