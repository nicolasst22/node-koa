const api = require("./api")
const logger = require("../config/logger");
const passport = require('../users/config/passport');
require("dotenv").config()
const args = require("../config/yargs")
const Router = require("koa-router");
const { addPath } = require("graphql/jsutils/Path");
const app = new Router();
const usuarioServices = require("../users/services")


//middleware que contra si esta logueado
// const auth = async (ctx, next) => {
//     const {req, res} = ctx;
//     next();
//     // if (req.isAuthenticated()) {
//     //     next();
//     // } else {
//     //     res.redirect('/login');
//     // }
// }
// app.get("/", auth, (ctx) => {
//      const {req, res} = ctx;
//     // if (req.session?.visitas) {
//     //     req.session.visitas = 1;
//     // } else {
//     //     req.session.visitas++;
//     // }
//     // const { username } = req.session;
//     res.render("index", { username })
// })

// app.get("/login", (ctx) => {
//     const { res, req } = ctx;
//     if (ctx.isAuthenticated()) {
//         ctx.redirect('/');
//     } else {
//         return ctx.render("login", { error: undefined })
//     }
// })


// app.post("/login", passport.authenticate("login", {
//     successRedirect: "/",
//     failureRedirect: "login",
//     failureMessage: "Invalid username or password"
// }))

// app.get("/logout", auth, (req, res) => {
//     const { username } = req.session;
//     req.session.destroy(err => {
//         if (err) {
//             res.send("Ha ocurrido un error")
//         } else {
//             req.logout();
//             res.render("logout", { username })
//         }
//     })
// })

// app.get("/registro", ctx => {
//     if (ctx.isAuthenticated()) {
//         ctx.redirect('/');
//     } else {
//         return ctx.render("registro", { error: ctx.session.messages ? ctx.session.messages[0] : undefined })
//         //req.session.messages = []
//     }
// })

// app.post("/registro", async function (ctx) {
//     console.log("ctx", ctx.request.body)
//     const {nombre, apellido, username, password} = ctx.request.body
//     await usuarioServices.registrar(nombre, apellido, username, password, (err, usuario) => {
//         if (err) {
//             // req.session.messages = [err]
//             ctx.redirect("/registro")
//         } else {
//             req.session.username = nombre;
//             eq.session.email = username;
//             done(null, usuario);
//         }
//     })
// })

// app.post("/registro", passport.authenticate("register", {
//     successRedirect: "/",
//     failureRedirect: "/registro"
// }))

// app.get('/auth/facebook', passport.authenticate('facebook', {
//     scope: ['public_profile', 'email']
// }));

// app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         failureRedirect: '/login',
//         failureMessage: "No se ha podido iniciar sesión con Facebook."
//     }),
//     (req, res) => {
//         req.session.username = req.user.nombre
//         req.session.email = req.user.email
//         //estoy dentro... voy a home
//         res.redirect('/');
//     }
// );
// app.use((req, res, next) => {
//     logger.info(`${req.method}: ${req.path}`);
//    // next();
// })
const numCPUs = require("os").cpus().length;
// app.use(function () {
//     yield this.render("index", {
//       title: "Test Page",
//       name: "World"
//     });
//   });

// app.use(hbs.middleware({
//     viewPath: __dirname + '/views'
//   }));

app.get("/info", (ctx) => {
    // const { req, res } = ctx;
    const info = {
        args: JSON.stringify(args),
        os: process.platform,
        node: process.version,
        memory: JSON.stringify(process.memoryUsage()),
        cwd: process.cwd(),
        pid: process.pid,
        path: process.execPath,
        cpus: numCPUs,
        port: args.port
    };
    ctx.state = { info }
    return ctx.render('info')
})

app.use("/api", api.routes());

app.use((req, res, next) => {
    const msg = `${req.method}: ${req.path} not found`;
    logger.warn(msg);
    res.status(404).send(msg);
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    logger.error("error", err);
    res.status(err.status || 500);
    res.render('error');
});





module.exports = app;