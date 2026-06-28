const { test, after, beforeEach  } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    "title": "x1",
    "author": "x1",
    "url": "x1",
    "likes": 3
  },
  {
    "title": "x2",
    "author": "x2",
    "url": "x2",
    "likes": 8
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs list length is correct', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog contains "id" as unique identifier', async () => {
  const response = await api
                    .get('/api/blogs')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)

  response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('blog is created successfully', async () => {
  const blog = {
    "title": "x1",
    "author": "x1",
    "url": "x1",
    "likes": 69
  }

  await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)

  const response = await api
                    .get('/api/blogs')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
  const blogs = response.body
  assert.strictEqual(blogs.length, initialBlogs.length+1)
})

test('blog without likes defined will default to 0', async () => {
  const blog = {
    "title": "test123",
    "author": "test123",
    "url": "test123"
  }

  const postResponse = await api
                              .post('/api/blogs')
                              .send(blog)
                              .expect(201)

  const response = await api
                          .get('/api/blogs')
                          .expect(200)
                          .expect('Content-Type', /application\/json/)

  const blogWithoutLike = response.body.find(blog => postResponse.body.id === blog.id)

  assert.ok(blogWithoutLike)
  assert.strictEqual(blogWithoutLike.likes, 0)
})

test('blog without title or url should return status 400', async () => {
  const blog = {
    "author": "asd"
  }

  await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
})

test('delete a blog', async () => {
  const response = await api
                      .get('/api/blogs')
                      .expect(200)
  
  const blog = response.body[0]

  await api.delete(`/api/blogs/${blog.id}`).expect(204)

  const responseAfterDelete = await api
                      .get('/api/blogs')
                      .expect(200)

  assert.strictEqual(responseAfterDelete.body.length, initialBlogs.length-1)
})

test('update a blog', async () => {
  const response = await api
                      .get('/api/blogs')
                      .expect(200)
  
  const blog = response.body[0]

  blog.title = 'updated title'

  const updatedBlog = await api
                            .put(`/api/blogs/${blog.id}`)
                            .send(blog)
                            .expect(200)

  assert.strictEqual(updatedBlog.body.title, blog.title)
})

after(async () => {
  await mongoose.connection.close()
})