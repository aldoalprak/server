const chai      = require('chai')
const expect    = chai.expect
const chaiHttp  = require('chai-http')
const server = require('../server') 

chai.use(chaiHttp)

let userId = ''

describe('API /users', () => {
  
  //create user
  describe('Post /create',() => {
    it('create one user', done => {
      chai.request(server)
      .post('/users/')
      .send({
        name: 'reza',
        email: 'rezaagny@gmail.com',
        createdAt: Date.now(),
        updatedAt: Date.now()
      })
      .end((err,res)=> {
        userId = res.body.data
        expect(res).to.have.status(201)
        expect(res.body.message).to.be.a('string').eql('Succeed adding new user')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //create user fail 
  describe('Post /create',() => {
    it('create one user fail test', done => {
      chai.request(server)
      .post('/users/')
      .send({
        // name: 'reza',
        // email: 'rezaagnygmail.com',
        // createdAt: Date.now(),
        // updatedAt: Date.now()
      })
      .end((err,res)=> {
        // userId = res.body.data
        expect(res).to.have.status(500)
        expect(res.body.message).to.be.a('string').eql('Error adding new user')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //findAll user
  describe('Get /findAll',() => {
    it('get all users', done => {
      chai.request(server)
      .get('/users')
      .end((err,res)=> {
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed getting all users')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })
  
  //finduserbyid
  describe('Get /findUserById',() => {
    it('find one user', done => {
      chai.request(server)
      .get(`/users/${userId}`)
      .end((err,res)=> {
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed getting user by id')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  //update
  describe('post /update',() => {
    it('update one user', done => {
      chai.request(server)
      .put(`/users/${userId}`)
      .send({
        name: 'reynaldi',
        email: 'reynaldi@gmail.com'
      })
      .end((err,res)=> {
        console.log(res.body)
        expect(res).to.have.status(200)
        expect(res.body.message).to.be.a('string').eql('Succeed updating user')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })

  
  //destroy
  describe('Delete /destroy',() => {
    it('delete one user', done => {
      chai.request(server)
      .delete(`/users/${userId}`)
      .end((err,res)=> {
        console.log(res.body)
        expect(res).to.have.status(500)
        expect(res.body.message).to.be.a('string').eql('Error removing user')
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })
    
})