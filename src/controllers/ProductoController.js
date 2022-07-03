const productos = require("../productos");
const logger = require("../config/logger")

exports.listaProductos = async (ctx) => {
    const result = await productos.getAll();
    ctx.body = result;
}

const NOT_FOUND = { error: 'producto no encontrado' };
exports.getProducto = async (ctx) => {
    const result = await productos.getById(parseInt(ctx.request.params.id));
    if (result) {
        ctx.body = result;
    } else {
        ctx.status = 404;
        ctx.body = NOT_FOUND
    }
}

exports.newProducto = async (ctx) => {
    try {
        const body = ctx.request.body;
        const nuevo = await productos.save(body)
        ctx.body = (nuevo)
    } catch (ex) {
        logger.error(ex.message)
        ctx.status = 500;
        ctx.body = ("Se produjo un error. Revise los logs de error");
    }
}

exports.updateProducto = async (ctx) => {
    const body = ctx.request.body;

    if (await productos.getById(parseInt(ctx.request.params.id))) {
        try {
            body.id = parseInt(ctx.request.params.id)
            await productos.save(body)
            ctx.body = body;
        } catch (ex) {
            ctx.status = 500;
            ctx.body = ("Se produjo un error. Revise los logs de error");
        }
    } else {
        ctx.status = 404;
        ctx.body = NOT_FOUND
    }
}

exports.deleteProducto = async (ctx) => {
    if (await productos.getById(parseInt(ctx.request.params.id))) {
        try {
            await productos.deleteById(parseInt(ctx.request.params.id));
            ctx.body= ({ mensaje: "Objeto eliminado" });
        } catch (ex) {
            logger.error(ex.message)
            ctx.status = 500;
            ctx.body = ("Se produjo un error. Revise los logs de error");
        }
    } else {
        ctx.status = 404;
        ctx.body = NOT_FOUND
    };
}
