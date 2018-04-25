const chai      = require('chai')
const expect    = chai.expect
const chaiHttp  = require('chai-http')
const server = require('../server') 

chai.use(chaiHttp)

let trekiId = '12345'
let userId = '12345'
let deviceId = '12345'

describe('API /treki', () => {

  //findAll treki device 
  describe('Get /findAll',() => {
    it('get all treki device', done => {
      chai.request(server)
      .get('/treki/')
      .end((err,res)=> {
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed getting all treki devices')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })
  
  //update treki 
  describe('Put /update',() => {
    it('update one user', done => {
      chai.request(server)
      .put(`/treki/${trekiId}`)
      .send({
        device_id: 12345,
        user_id: 12345,
        location: 'bandung',
        name : 'hp',
        image_url : 'www.yahoo.com'
      })
      .end((err,res)=> {
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed updating treki device')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //create new treki device 
  describe('Post /create',() => {
    it('create one treki device', done => {
      chai.request(server)
      .post('/treki/')
      .send({
        name : 'mobil',
        device_id : '12345',
        image_url : 'www.google.com',
        user_id: '12345',
        location: 'jakarta',
        status: false,
      })
      .end((err,res)=> {
        console.log(res.body)
        trekiId = res.body.data 
        expect(res).to.have.status(201)
        expect(res.body.message).to.be.a('string').eql('Succeed adding new treki device')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  // create device fail
  describe('Post /create',() => {
    it('create one treki device fail', done => {
      chai.request(server)
      .post('/treki/')
      .send({})
      .end((err,res)=> {
        console.log(res.body)
        trekiId = res.body.data 
        expect(res).to.have.status(500)
        expect(res.body.message).to.be.a('string').eql('Error adding new treki device')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //find by treki id 
  describe('Get /findTrekiById',() => {
    it('find treki by id', done => {
      chai.request(server)
      .get(`/treki/${deviceId}`)
      .end((err,res)=> {
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed getting treki device by id')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })
  
  //destroy
  describe('Delete /destroy',() => {
    it('delete one user', done => {
      chai.request(server)
      .delete(`/treki/${trekiId}`)
      .end((err,res)=> {
        console.log(res.body)
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed removing treki device')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //push notification test trigger
  describe('Get /pushnotification',() => {
    it('push notification', done => {
      chai.request(server)
      .get(`/treki/pushnotification`)
      .end((err,res)=> {
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Push Notification Success')                
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //createv2 
  describe('Post /create',() => {
    // const image = require('../splashlogo.png')
    it('create one treki device with multer', done => {
      chai.request(server)
      .post('/treki/createv2')
      .send({
        name : 'mobil',
        device_id : '12345',
        image: 'image',
        user_id: '12345',
        location: 'jakarta',
        status: false,
      })
      .end((err,res)=> {
        console.log(res.body)
        trekiId = res.body.data 
        expect(res).to.have.status(500)
        // expect(res.body.message).to.be.a('string').eql('Error adding new treki device')
        // expect(res.body).to.be.an('object')
        done()
      })
    })
  })
  
  //get treki by user id
  describe('Get /user_id/:user_id',() => {
    it('get treki by user id', done => {
      chai.request(server)
      .get(`/treki/user_id/${userId}`)
      .end((err,res)=> {
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed getting all treki devices by id')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })
    
  // update other treki location 
  describe('Get /device_id/:device_id',() => {
    it('get treki by user id', done => {
      chai.request(server)
      .put(`/treki/device_id/${deviceId}`)
      .send({
        key: '12345'
      })
      .end((err,res)=> {
        expect(res).to.have.status(500)
        expect(res.body.message).to.be.a('string').eql('Error updating location')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //update location 
  describe('Get /:id/location',() => {
    it('get treki by user id', done => {
      chai.request(server)
      .put(`/treki/${deviceId}/location`)
      .end((err,res)=> {
        expect(res).to.have.status(500)
        expect(res.body.message).to.be.a('string').eql('Error updating treki location')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //update state
  describe('Get /:id/status',() => {
    it('update state device status', done => {
      chai.request(server)
      .put(`/treki/${deviceId}/status`)
      .end((err,res)=> {
        expect(res).to.have.status(500)
        expect(res.body.message).to.be.a('string').eql('Error updating treki state')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })


})