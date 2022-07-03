const productosAPI = require("./productos")
const mensajesAPI = require("./mensajes")
const Router = require("koa-router")
const api = new Router();
const { fork } = require("child_process");

 api.use("/productos", productosAPI.routes());
 api.use("/mensajes", mensajesAPI.routes());

api.get("/randoms", (ctx) => {
    const { req, res } = ctx;
    let cant = ctx.request.query.cant || 1e7;
    // const child = fork("./src/utils/random.js", [cant]);
    // child.on("message", val => {
    //     const obj = {
    //         port: req.port,
    //         randoms: val
    //     }
    //     res.json(obj);
    // })

    let a = {};
    for (i = 0; i < cant; i++) {
        let n = Math.floor(Math.random() * (cant - 1)) + 1;
        a[n] = a[n] ? (a[n] + 1) : 1;
    }
    ctx.body = a;
})
api.get("/saludozip", (req, res) => {
    let saludo = "";
    for (i = 0; i < 100; i++) {
        saludo += "hola";
    }
    res.send(saludo);
})

api.get("/saludo", (ctx) => {
    ctx.body = "Hola Mundo";
})

module.exports = api;