'use strict'

import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import JSendExpress from 'jsend-express'
import strftime from 'strftime'
import { cleanProcess } from 'helpers/clean-process.js'


const { JSend, middlewareErrorHandler } = JSendExpress
const jSend = new JSend(config.jSend)

const app = express()

// set config global application
app.locals.title = config.jSend.name
app.locals.strftime = strftime
app.locals.email = config.dev.email

// do not give away too much about the underlying technology used..
app.disable('x-powered-by')
// init server helpers
app.use(express.json())
app.use(jSend.middleware.bind(jSend))
app.use(morgan(config.morgan))
app.use(bodyParser.json(config.bodyParser))

// router api
app.use(sendMailAPI)
// route public
app.use(express.static('public'))

// gestion error
app.use(middlewareErrorHandler)

app.listen(config.port, (error) => {
    if (error) {
        console.log('express cannot start', { err: error })
        return
    }
    console.log(`API server started on port ${config.port}`)
})

cleanProcess(app)
