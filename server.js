const Koa = require('koa');
const router = require("./src/router/index");
// const passport = require('./src/users/config/passport');
const path = require("path")
const render = require('koa-ejs');
var bodyParser = require('koa-body');
const session = require('koa-session')
const passport = require('koa-passport')
const graphql = require('./src/grapghql/index')


const app = new Koa()
render(app, {
  root: path.join(__dirname, "src", "views"),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

function hybridBodyParser(opts) {
  const bp = bodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true
  })
  return async (ctx, next) => {
    if (ctx.get("Content-Type") === 'application/json') {
      return next();
    } else {
      return bp(ctx, next)
    }
  }
}
app.use(hybridBodyParser());
app.keys = ['secret']
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())

const rutas = router.routes();
app.use(
  graphql
);
app.use(rutas);

app.listen(8080);

