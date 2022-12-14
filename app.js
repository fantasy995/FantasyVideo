const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
const ratelimit = require('koa-ratelimit');
const fs = require('fs')

require('module-alias/register')


const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(cors(
  {
    origin: `*`,
  }
))
app.use(catchError)
app.use(parser())

// 接口调用频率限制（Rate-Limiting）
// Rate limiter middleware for koa.
// https://github.com/koajs/ratelimit
const db = new Map();
app.use(ratelimit({
  driver: 'memory',
  db: db,
  duration: 60000,
  errorMessage: 'Sometimes You Just Have to Slow Down.',
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: 1000,
  disableHeader: false,
  whitelist: (ctx) => {
    // some logic that returns a boolean
  },
  blacklist: (ctx) => {
    // some logic that returns a boolean
  }
}));

InitManager.initCore(app)

app.use(async (ctx, next) => {
  await next();   
  if (!ctx.body) {  
    ctx.type = "html";
    ctx.body = fs.readFileSync( `${process.cwd()}/dist/index.html`)
  }
})

app.listen(5000, () => {
  console.log('Koa is listening in http://localhost:5000')
})

module.exports = app
