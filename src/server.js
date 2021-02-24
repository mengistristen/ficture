import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import session from 'express-session'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import * as sapper from '@sapper/server'
import multer from 'multer'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
const MongoStore = connectMongo(session)
const upload = multer()

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

express()
  .use('/maps.json', upload.single('file'))
  .use(
    bodyParser.json(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    session({
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      resave: false,
      saveUninitialized: false
    }),
    sapper.middleware({
      session: (req) => ({ user: req.session.user })
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err)
  })
