import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import session from 'express-session'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

dotenv.config()

express()
  .use(
    bodyParser.json(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
    sapper.middleware({
      session: (req) => ({ user: req.session.user }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err)
  })
