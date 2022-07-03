const Koa = require('koa');
const koaBody = require("koa-body");
const router = require("./src/router/index");
// const passport = require('./src/users/config/passport');
const path = require("path")
const render = require('koa-ejs');
var bodyParser = require('koa-body');
const session = require('koa-session')
const passport = require('koa-passport')
const mount = require('koa-mount');
const graphql = require('./src/grapghql/index')


const app = new Koa()
render(app, {
  root: path.join(__dirname, "src", "views"),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});
//  .use(views(path.join(__dirname, "src", "views"), {
//     map: { hbs: 'handlebars' },
//     default: 'handlebars',
//     options: {
//       helpers: {
//         uppercase: (str) => str.toUpperCase()
//       },
//       main: "./src/views/main",
//       cache: true // cache the template string or not
//     }
//   }))
// app.use(hbs(path.join(__dirname, "src", "views"), {
//     partialDirs: path.join(__dirname, "src", "views", "layouts") 
// }));

app.use(koaBody());
// app.use(bodyParser({
//   formidable:{uploadDir: './uploads'},
//   multipart: true,
//   urlencoded: true
//   }));

app.keys = ['secret']
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())

const rr = router.routes();
app.use(
  graphql
);
//app.use('/graphql', graphql);
app.use(rr);
// app.use((ctx)=>{
//     ctx.body = "Hola Mundo";
// });


app.listen(8080);

