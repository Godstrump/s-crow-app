// const cors = require('cors');
require('dotenv').config()
const {indexRouter} = require('./controllers/index.router')

const express = require('express')
const next = require('next')

const PORT = parseInt(process.env.REACT_APP_PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

if (dev) {
  require("./config/dbconnection.config").connect();
}

app.prepare().then(() => {
  const server = express()

  // server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({
    extended: true
  }));
  
  // ROUTES
  server.use('/api/', indexRouter);
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })
  
  
  server.listen(PORT, error => {
    if (error) throw error;
    console.log(`>>> Server is running on http://localhost:${PORT}`)
  })
})