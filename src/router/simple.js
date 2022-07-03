const Router = require("koa-router")

const app = new Router();

app.get("/", (ctx)=>{
    ctx.body = "Hola rutas";
});

module.exports = app;
